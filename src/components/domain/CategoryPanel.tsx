import type { Category } from "../../types"
import ProgressBar from "../ui/ProgressBar"
import { useTracker } from "../../store/goals"

export default function CategoryPanel({ cat }:{ cat: Category }){
  const { goals, toggleGoal } = useTracker(s=>({ goals: s.goals.filter(g=>g.category===cat), toggleGoal: s.toggleGoal }))
  const done = goals.filter(g=>g.completed).length
  const total = goals.length || 1
  const progress = Math.round(goals.reduce((a,g)=>a+(g.progress ?? (g.completed?100:0)),0)/total)

  return (
    <section className="card p-5 hover-glow">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{cat}</h3>
        <span className="text-xs rounded-full bg-slate-100 px-2 py-0.5">{done}/{goals.length || 0}</span>
      </div>
      <div className="mt-3">
        <div className="mb-1 text-xs text-slate-500">Progress</div>
        <ProgressBar value={goals.length ? progress : 0} />
      </div>
      <ul className="mt-4 space-y-3">
        {goals.length===0 && <li className="text-sm text-slate-500">No goals yet in this category.</li>}
        {goals.map(g => (
          <li key={g.id} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
            <input type="checkbox" className="h-4 w-4 accent-[var(--accent-600)]" checked={!!g.completed} onChange={()=>toggleGoal(g.id)} />
            <span className={g.completed ? "line-through text-slate-400" : ""}>{g.title}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
