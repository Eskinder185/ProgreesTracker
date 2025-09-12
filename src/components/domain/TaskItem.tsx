import type { Task } from '../../types'
import { fmt, dueIn } from '../../utils/date'
import { useTracker } from '../../store/goals'

export default function TaskItem({ task }: { task: Task }){
  const { setTaskStatus, deleteTask } = useTracker()
  const next = task.status === 'todo' ? 'doing' : task.status === 'doing' ? 'done' : 'todo'
  return (
    <div className="card p-5 flex items-start gap-4 hover-glow">
      <div className="flex-1">
        <div className="font-medium">{task.title}</div>
        {task.description && <div className="text-sm text-slate-500 mt-1">{task.description}</div>}
        <div className="text-xs text-slate-500 mt-2 flex flex-wrap items-center gap-2">
          {task.category && <span className="badge">{task.category}</span>}
          {task.due && <span>Due: {fmt(task.due)} · {dueIn(task.due)}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={()=>setTaskStatus(task.id, next)} className="badge accent-bg">Mark {next}</button>
        <button onClick={()=>deleteTask(task.id)} className="badge bg-slate-200">Delete</button>
      </div>
    </div>
  )
}

