export default function Footer(){
  return (
    <footer className="mt-10">
      <div className="container-page py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Progress Tracker — Vite • React • Tailwind
      </div>
    </footer>
  )
}

