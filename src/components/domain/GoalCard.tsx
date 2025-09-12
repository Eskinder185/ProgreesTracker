import React from 'react'
import type { Goal } from '../../types'
import ProgressBar from '../ui/ProgressBar'
import { useTracker } from '../../store/goals'

export default function GoalCard({ goal }: { goal: Goal }) {
  const toggleGoal = useTracker(s => s.toggleGoal)
  const setGoalProgress = useTracker(s => s.setGoalProgress)
  const deleteGoal = useTracker(s => s.deleteGoal)

  const pct = goal.progress ?? (goal.completed ? 100 : 0)

  return (
    <div className="card p-5 flex flex-col gap-3 hover-glow">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={() => toggleGoal(goal.id)}
          className="mt-1 h-5 w-5"
          style={{ accentColor: 'var(--accent-600)' }}
          aria-label={`Toggle ${goal.title} complete`}
        />
        <div className="flex-1">
          <div className="font-medium">{goal.title}</div>
          {goal.description && (
            <p className="text-sm text-slate-500 mt-1">{goal.description}</p>
          )}
        </div>
        <button
          onClick={() => deleteGoal(goal.id)}
          className="text-xs rounded-full bg-black/80 text-white px-2 py-1"
          title="Delete goal"
        >
          Delete
        </button>
      </div>

      <div className="flex items-center gap-3">
        <ProgressBar value={pct} />
        <div className="text-sm w-12 text-right">{pct}%</div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setGoalProgress(goal.id, parseInt(e.target.value, 10))}
        aria-label={`Set progress for ${goal.title}`}
      />

      <div className="flex items-center gap-2">
        <span className="badge">{goal.category}</span>
        {goal.kind === 'progress' && <span className="badge accent-bg">Progress</span>}
      </div>
    </div>
  )
}