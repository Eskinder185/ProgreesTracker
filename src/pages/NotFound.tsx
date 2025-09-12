import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="h-[50vh] grid place-items-center text-center space-y-3">
      <div className="text-3xl font-semibold">404</div>
      <p className="text-slate-500">Page not found.</p>
      <Link to='/' className="badge bg-brand-600 text-white inline-block">Back to Dashboard</Link>
    </div>
  )
}

