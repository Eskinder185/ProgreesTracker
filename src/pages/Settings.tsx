import { useTracker } from '../store/goals'
export default function Settings(){
  const s = useTracker(st=>st.stats())
  return (
    <div className="space-y-4">
      <h2 className="section-title">Settings</h2>
      <div className="card p-5 text-sm text-slate-600">
        Stats snapshot: {s.doneGoals}/{s.totalGoals} goals; {s.overallProgress}% overall.
      </div>
    </div>
  )
}

