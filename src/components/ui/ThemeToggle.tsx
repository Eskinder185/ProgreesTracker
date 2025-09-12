import { useEffect, useState } from "react"
import { Palette } from "lucide-react"
import { getTheme, setTheme, initTheme, nextTheme, type ThemeKey, THEMES } from "../../theme"

export default function ThemeToggle(){
  const [t,setT] = useState<ThemeKey>('pink')

  useEffect(()=>{ initTheme(); setT(getTheme()) },[])
  function cycle(){
    const nt = nextTheme(t)
    setTheme(nt); setT(nt)
  }

  return (
    <button
      className={
        `hover-glow focus-ring-accent rounded-full px-3 py-2 text-sm border accent-border flex items-center gap-2`
      }
      style={{
        backgroundColor: 'var(--accent-600)',
        color: '#fff',
        transition: 'background-color 0.3s, color 0.3s'
      }}
      title={`Theme: ${t} (click to change)`}
      onClick={cycle}
      aria-label="Change theme color"
    >
      <Palette size={16} />
      <span className="hidden sm:inline">Theme</span>
      <span className="ml-1 text-xs rounded-full px-2 py-0.5 accent-chip" style={{ backgroundColor: 'var(--accent-200)', color: 'var(--accent-800)' }}>{t}</span>
    </button>
  )
}
