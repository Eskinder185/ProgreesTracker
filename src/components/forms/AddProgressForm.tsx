import { useState } from "react"
import { useTracker } from "../../store/goals"
import { CATEGORIES, type Category } from "../../types"

export default function AddProgressForm(){
  const addGoal = useTracker(s=>s.addGoal)
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState<Category>('Academic / MPH')
  const [desc,setDesc] = useState("")
  const [progress,setProgress] = useState(50)

  function submit(e:React.FormEvent){
    e.preventDefault()
    if(!title.trim()) return
    addGoal({
      title: title.trim(),
      category,
      description: desc.trim() || undefined,
      progress,
      kind: 'progress'
    })
    setTitle(""); setDesc(""); setProgress(50)
  }

  return (
    <form onSubmit={submit} className="card p-4 grid gap-3">
      <div className="font-medium">Create Progress</div>
      <input
        value={title}
        onChange={e=>setTitle(e.target.value)}
        placeholder="Progress title (e.g., LinkedIn Revamp)"
        className="rounded-lg border px-3 py-2 text-sm focus-ring-accent"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={category}
          onChange={e=>setCategory(e.target.value as Category)}
          className="rounded-lg border px-3 py-2 text-sm focus-ring-accent"
        >
          {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-600">Initial %</label>
          <input
            type="range" min={0} max={100} value={progress}
            onChange={e=>setProgress(parseInt(e.target.value,10))}
            className="flex-1"
          />
          <span className="text-sm w-10 text-right">{progress}%</span>
        </div>
      </div>
      <textarea
        value={desc}
        onChange={e=>setDesc(e.target.value)}
        placeholder="Optional description"
        className="rounded-lg border px-3 py-2 text-sm focus-ring-accent"
      />
      <div className="text-right">
        <button className="accent-bg-solid rounded-lg px-3 py-2 text-sm">
          Add Progress
        </button>
      </div>
    </form>
  )
}
