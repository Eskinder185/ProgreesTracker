import ProgressBar from './ProgressBar'
export default function Stat({ title, value, suffix, progress }:{
  title:string; value:string|number; suffix?:string; progress?:number
}){
  return (
    <div className="card p-5">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}{suffix ?? ''}</div>
      {typeof progress === 'number' && <div className="mt-3"><ProgressBar value={progress}/></div>}
    </div>
  )
}

