import { Plus, TrendingUp, ListChecks } from "lucide-react"

type Kind = 'goal' | 'progress' | 'task'

export default function ActionTray({
  active,
  onPick,
}: {
  active: Kind | null
  onPick: (k: Kind) => void
}) {
  return (
    <div className="action-tray">
      <div className="action-tray-card mx-auto w-max px-2 py-2 flex items-center gap-2">
        <button
          className="action-pill"
          data-active={active === 'goal'}
          onClick={() => onPick(active === 'goal' ? null as any : 'goal')}
          title="+ Add Goal"
        >
          <span className="action-icon"><Plus size={16}/></span>
          <span>+ Add Goal</span>
        </button>

        <button
          className="action-pill"
          data-active={active === 'progress'}
          onClick={() => onPick(active === 'progress' ? null as any : 'progress')}
          title="+ Add Progress"
        >
          <span className="action-icon"><TrendingUp size={16}/></span>
          <span>+ Add Progress</span>
        </button>

        <button
          className="action-pill"
          data-active={active === 'task'}
          onClick={() => onPick(active === 'task' ? null as any : 'task')}
          title="+ Add Task"
        >
          <span className="action-icon"><ListChecks size={16}/></span>
          <span>+ Add Task</span>
        </button>
      </div>
    </div>
  )
}
