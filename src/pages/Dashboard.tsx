// src/pages/Dashboard.tsx
import { useState } from "react"
import { CATEGORIES, type Category } from "../types"
import { useTracker } from "../store/goals"
import AddGoalForm from "../components/forms/AddGoalForm"
import AddProgressForm from "../components/forms/AddProgressForm"
import AddTaskForm from "../components/forms/AddTaskForm"
import GoalCard from "../components/domain/GoalCard"
import TaskItem from "../components/domain/TaskItem"
import CategoryPanel from "../components/domain/CategoryPanel"
import Stat from "../components/ui/Stat"
import { useSettings } from "../store/settings"
import { remainingText } from "../utils/date"
import ActionTray from "../components/ui/ActionTray"

export default function Dashboard(){
  const { goals, tasks, stats } = useTracker()
  const s = stats()
  const [showAdd, setShowAdd] = useState<'goal'|'progress'|'task'|null>(null)

  const { targetEndDate } = useSettings()
  const remain = remainingText(targetEndDate || undefined)

  // Filter by category for the lists below
  const [cat, setCat] = useState<"All" | Category>("All")
  const catsWithCounts = CATEGORIES.map(c => ({
    cat: c,
    count: goals.filter(g=>g.category===c).length
  }))

  return (
    <div className="space-y-8">
      {/* Fancy sticky tray */}
      <ActionTray active={showAdd} onPick={k=>setShowAdd(k)} />

      {/* Optional: keep your simple filter chips under the tray */}
      <div className="flex flex-wrap gap-3">
        <div className="badge bg-slate-100">Filter:</div>
        <button onClick={()=>setCat("All")} className={`badge ${cat==='All'?'accent-bg':'bg-white'}`}>All</button>
        {catsWithCounts.map(({cat: c, count})=>(
          <button key={c} onClick={()=>setCat(c)} className={`badge ${cat===c?'accent-bg':'bg-white'}`}>{c} ({count})</button>
        ))}
      </div>

      {/* Creation forms (open/close controlled by the tray) */}
      {showAdd==='goal' && <AddGoalForm/>}
      {showAdd==='progress' && <AddProgressForm/>}
      {showAdd==='task' && <AddTaskForm/>}

      {/* Live KPI cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Stat title="Completed Goals" value={s.doneGoals} suffix={` / ${s.totalGoals}`}/>
        <Stat title="Overall Progress" value={`${s.overallProgress}%`} progress={s.overallProgress}/>
        <Stat title="Categories" value={s.categories}/>
        <Stat title="Time Remaining" value={targetEndDate ? remain.text : '—'} />
      </div>

      {/* Goals & Tasks lists */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="section-title">Goals {cat!=='All' && <span className="text-slate-400">({cat})</span>}</h2>
          {(cat==='All'?goals:goals.filter(g=>g.category===cat)).map(g => <GoalCard key={g.id} goal={g} />)}
          {goals.length===0 && <div className="text-sm text-slate-500">No goals/progress yet. Use the tray above to add one.</div>}
        </div>
        <div className="space-y-4">
          <h2 className="section-title">Tasks {cat!=='All' && <span className="text-slate-400">({cat})</span>}</h2>
          {(cat==='All'?tasks:tasks.filter(t=>t.category===cat)).map(t => <TaskItem key={t.id} task={t} />)}
          {tasks.length===0 && <div className="text-sm text-slate-500">No tasks yet. Use the tray above to add one.</div>}
        </div>
      </section>

      {/* Category progress panels */}
      <div className={`grid ${cat==='All'?'lg:grid-cols-2':'grid-cols-1'} gap-6`}>
        {(cat==='All'?CATEGORIES:[cat]).map(c => <CategoryPanel key={c} cat={c}/>)}
      </div>
    </div>
  )
}
