import { useTracker } from '../store/goals'
import TaskItem from '../components/domain/TaskItem'
export default function AcademicTasks(){
  const tasks = useTracker(s=>s.tasks).filter(t=>t.category==='Academic / MPH')
  return (
    <div className="space-y-4">
      <h2 className="section-title">Academic Tasks</h2>
      {tasks.map(t => <TaskItem key={t.id} task={t}/>)}
    </div>
  )
}

