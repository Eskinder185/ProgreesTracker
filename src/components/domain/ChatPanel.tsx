import { useEffect, useRef, useState } from "react"
import { handleUserMessage } from "../../bot/handler"
import { execute, type Parsed } from "../../bot/execute"
import { Send, Bot, User, Zap, Plus, TrendingUp, ListChecks } from "lucide-react"
import { CATEGORIES, type Category } from "../../types"

type Msg = { role: "user" | "assistant"; text: string }

function Row({label,children}:{label:string;children:React.ReactNode}) {
  return (
    <label className="text-xs text-slate-600 flex items-center gap-2">
      <span className="w-16">{label}</span>
      <div className="flex-1">{children}</div>
    </label>
  )
}

export default function ChatPanel({ open, onClose }:{ open:boolean; onClose:()=>void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hi! You can add goals, progress, and tasks here. Try the quick forms below, or type natural commands (e.g., “set progress LinkedIn to 40%”)." }
  ])
  const [input, setInput] = useState("")
  const [useAI, setUseAI] = useState<boolean>(() => localStorage.getItem('pt/ai')==='1')
  const [quick, setQuick] = useState<null | 'goal' | 'progress' | 'task'>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // quick form state
  const [gTitle, setGTitle] = useState("")
  const [gCat, setGCat] = useState<Category>("Academic / MPH")
  const [gDesc, setGDesc] = useState("")
  const [gPct, setGPct] = useState(0)

  const [tTitle, setTTitle] = useState("")
  const [tCat, setTCat] = useState<Category>("Academic / MPH")
  const [tDue, setTDue]   = useState("")

  useEffect(() => { listRef.current?.scrollTo({ top: 99999, behavior: "smooth" }) }, [msgs, open])
  useEffect(() => { localStorage.setItem('pt/ai', useAI?'1':'0') }, [useAI])

  async function send() {
    const text = input.trim(); if (!text) return
    setInput("")
    setMsgs(m => [...m, { role: "user", text }])
    const res = await handleUserMessage(text)
    setMsgs(m => [...m, { role: "assistant", text: res.text }])
  }

  // Submit helpers that go through the bot (no AI needed)
  function postAndExecute(parsed: Parsed) {
    // show a "user" line that mirrors their action
    const pretty =
      parsed.intent === 'addGoal'
        ? `Add ${parsed.kind==='progress'?'progress':'goal'}: "${parsed.title}"` +
          (parsed.category?` in ${parsed.category}`:"") +
          (typeof parsed.progress==='number'?` at ${parsed.progress}%`:"")
        : parsed.intent === 'addTask'
        ? `Add task: "${parsed.title}"` + (parsed.category?` in ${parsed.category}`:"") + (parsed.due?` due ${parsed.due}`:"")
        : 'Command'
    setMsgs(m => [...m, { role: "user", text: pretty }])

    const reply = execute(parsed)
    setMsgs(m => [...m, { role: "assistant", text: reply }])
  }

  function submitGoal(kind:'goal'|'progress') {
    if (!gTitle.trim()) return
    postAndExecute({
      intent: 'addGoal',
      title: gTitle.trim(),
      category: gCat,
      description: gDesc.trim() || undefined,
      kind,
      progress: kind==='progress' ? gPct : (gPct || 0)
    })
    setGTitle(""); setGDesc(""); setGPct( kind==='progress' ? 50 : 0 )
  }

  function submitTask() {
    if (!tTitle.trim()) return
    postAndExecute({
      intent: 'addTask',
      title: tTitle.trim(),
      category: tCat,
      due: tDue || undefined
    })
    setTTitle(""); setTDue("")
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 z-50 grid place-items-end p-4 sm:p-6" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="px-4 py-3 border-b bg-slate-50 flex items-center justify-between">
          <div className="font-semibold">Progress Assistant</div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600 flex items-center gap-1 cursor-pointer">
              <input type="checkbox" checked={useAI} onChange={e=>setUseAI(e.target.checked)} />
              <Zap size={14} className="accent-text"/> AI
            </label>
            <button className="text-sm text-slate-500 hover-glow" onClick={onClose}>Close</button>
          </div>
        </div>

        {/* messages */}
        <div ref={listRef} className="h-64 overflow-y-auto p-4 space-y-3">
          {msgs.map((m,i)=>(
            <div key={i} className={`flex items-start gap-2 ${m.role==='user'?'justify-end':''}`}>
              {m.role==='assistant' && <Bot size={18} className="mt-1 accent-text" />}
              <div className={`rounded-2xl px-3 py-2 text-sm ${m.role==='user'?'accent-bg-solid text-white':'bg-slate-100 text-slate-800'}`}>
                {m.text}
              </div>
              {m.role==='user' && <User size={18} className="mt-1 accent-text" />}
            </div>
          ))}
        </div>

        {/* quick add */}
        <div className="px-4 pb-3 space-y-2 border-t bg-white">
          <div className="text-xs text-slate-500">Quick add</div>
          <div className="flex flex-wrap gap-2">
            <button className="badge accent-bg hover-glow" onClick={()=>setQuick(quick==='goal'?null:'goal')}><Plus size={14}/> Goal</button>
            <button className="badge accent-bg hover-glow" onClick={()=>setQuick(quick==='progress'?null:'progress')}><TrendingUp size={14}/> Progress</button>
            <button className="badge accent-bg hover-glow" onClick={()=>setQuick(quick==='task'?null:'task')}><ListChecks size={14}/> Task</button>
          </div>

          {/* forms */}
          {quick==='goal' && (
            <div className="card p-3 grid gap-2">
              <Row label="Title"><input value={gTitle} onChange={e=>setGTitle(e.target.value)} className="rounded-lg border px-2 py-1 text-sm w-full"/></Row>
              <Row label="Category">
                <select value={gCat} onChange={e=>setGCat(e.target.value as Category)} className="rounded-lg border px-2 py-1 text-sm w-full">
                  {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </Row>
              <Row label="Notes"><input value={gDesc} onChange={e=>setGDesc(e.target.value)} className="rounded-lg border px-2 py-1 text-sm w-full"/></Row>
              <Row label="% Start">
                <input type="range" min={0} max={100} value={gPct} onChange={e=>setGPct(parseInt(e.target.value,10))} className="w-full"/>
                <span className="text-xs w-10 text-right">{gPct}%</span>
              </Row>
              <div className="text-right">
                <button className="accent-bg-solid rounded-lg px-3 py-1.5 text-sm" onClick={()=>submitGoal('goal')}>Add Goal</button>
              </div>
            </div>
          )}

          {quick==='progress' && (
            <div className="card p-3 grid gap-2">
              <Row label="Title"><input value={gTitle} onChange={e=>setGTitle(e.target.value)} className="rounded-lg border px-2 py-1 text-sm w-full"/></Row>
              <Row label="Category">
                <select value={gCat} onChange={e=>setGCat(e.target.value as Category)} className="rounded-lg border px-2 py-1 text-sm w-full">
                  {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </Row>
              <Row label="% Start">
                <input type="range" min={0} max={100} value={gPct} onChange={e=>setGPct(parseInt(e.target.value,10))} className="w-full"/>
                <span className="text-xs w-10 text-right">{gPct}%</span>
              </Row>
              <div className="text-right">
                <button className="accent-bg-solid rounded-lg px-3 py-1.5 text-sm" onClick={()=>submitGoal('progress')}>Add Progress</button>
              </div>
            </div>
          )}

          {quick==='task' && (
            <div className="card p-3 grid gap-2">
              <Row label="Title"><input value={tTitle} onChange={e=>setTTitle(e.target.value)} className="rounded-lg border px-2 py-1 text-sm w-full"/></Row>
              <Row label="Category">
                <select value={tCat} onChange={e=>setTCat(e.target.value as Category)} className="rounded-lg border px-2 py-1 text-sm w-full">
                  {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </Row>
              <Row label="Due"><input type="date" value={tDue} onChange={e=>setTDue(e.target.value)} className="rounded-lg border px-2 py-1 text-sm w-full"/></Row>
              <div className="text-right">
                <button className="accent-bg-solid rounded-lg px-3 py-1.5 text-sm" onClick={submitTask}>Add Task</button>
              </div>
            </div>
          )}
        </div>

        {/* free text composer */}
        <div className="p-3 flex items-center gap-2 border-t bg-white">
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') send() }}
            placeholder='e.g., set progress LinkedIn to 40%'
            className="flex-1 rounded-xl border px-3 py-2 text-sm focus-ring-accent"
          />
          <button onClick={send} className="rounded-xl bg-slate-900 text-white px-3 py-2 text-sm hover:scale-[1.02] transition">
            <Send size={16}/>
          </button>
        </div>
      </div>
    </div>
  )
}