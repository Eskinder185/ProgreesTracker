import { useState } from "react"
import { useTracker } from "../../store/goals"
import { CATEGORIES, type Category } from "../../types"

export default function AddTaskForm(){
  const addTask = useTracker(s=>s.addTask)
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState<Category>('Academic / MPH')
  const [due,setDue] = useState("")

  function submit(e:React.FormEvent){
    e.preventDefault()
    if(!title.trim()) return
    addTask({ title:title.trim(), category, due: due || undefined })
    setTitle(""); setDue("")
  }

  return (
    <form onSubmit={submit} className="card p-4 grid gap-3">
      <div className="font-medium">Add Task</div>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" className="rounded-lg border px-3 py-2 text-sm focus-ring-accent"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select value={category} onChange={e=>setCategory(e.target.value as Category)} className="rounded-lg border px-3 py-2 text-sm focus-ring-accent">
          {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <input type="date" value={due} onChange={e=>setDue(e.target.value)} className="rounded-lg border px-3 py-2 text-sm focus-ring-accent"/>
      </div>
      <div className="text-right">
        <button className="accent-bg-solid rounded-lg px-3 py-2 text-sm">Add Task</button>
      </div>
    </form>
  )
}
