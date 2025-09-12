import { useTracker } from '../store/goals'
import { fmt } from '../utils/date'
export default function ProjectTimeline(){
  const tasks = [...useTracker(s=>s.tasks)].sort((a,b)=> (a.due||'').localeCompare(b.due||''))
  return (
    <div className="space-y-6">
      <h2 className="section-title">Project Timeline</h2>
      <ol>
        {tasks.map(t => (
          <li key={t.id} className="card p-5 mb-3">
            <div className="text-sm text-slate-500">{fmt(t.due)}</div>
            <div className="font-medium">{t.title}</div>
            {t.description && <div className="text-sm text-slate-600 mt-1">{t.description}</div>}
          </li>
        ))}
      </ol>
    </div>
  )
}

