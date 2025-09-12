// src/pages/LifeGoals.tsx
import { useTracker } from '../store/goals'
import GoalCard from '../components/domain/GoalCard'

export default function LifeGoals() {
  const goals = useTracker(s => s.goals)
  return (
    <div className="space-y-4">
      <h2 className="section-title">Life Goals</h2>
      {goals.length === 0 && (
        <div className="text-sm text-slate-500">No goals yet — add some from the Dashboard.</div>
      )}
      {goals.map(g => <GoalCard key={g.id} goal={g} />)}
    </div>
  )
}
