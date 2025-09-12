import { useEffect } from "react"
import { Target } from "lucide-react"
import CenterNav from "./CenterNav"
import ThemeToggle from "../ui/ThemeToggle"
import { initTheme } from "../../theme"
import { NavLink } from "react-router-dom"

export default function Header() {
  useEffect(()=>{ initTheme() },[])
  return (
    <header className="w-full hero-wrap">
      <div className="container-page py-10 md:py-14 relative">
        {/* Top-right: theme + quick links */}
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <NavLink
            to="/about"
            className={({isActive}) => `link-pill ${isActive ? 'link-pill--active' : ''}`}
          >
            About
          </NavLink>
          <NavLink
            to="/faq"
            className={({isActive}) => `link-pill ${isActive ? 'link-pill--active' : ''}`}
          >
            FAQ
          </NavLink>
          <ThemeToggle />
        </div>

        {/* centered title block */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-2xl accent-bg-solid grid place-items-center shadow hover-glow">
            <Target size={24}/>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight accent-text">ZeroEffort Tracker</h1>
          <p className="mt-2 text-slate-600">Track your goals, progress, and tasks—zero hassle.</p>
          <p className="text-sm text-slate-500">Your data stays in your browser. Optional AI runs locally.</p>
        </div>

        {/* centered nav (keep core pages only) */}
        <div className="mt-6">
          <CenterNav />
        </div>
      </div>
    </header>
  )
}
