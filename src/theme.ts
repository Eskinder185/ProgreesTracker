export type ThemeKey = 'pink'|'violet'|'sky'|'emerald'|'rose'|'amber'|'indigo'
export const THEMES: ThemeKey[] = ['pink','violet','sky','emerald','rose','amber','indigo']

const STORAGE_KEY = 'pt/theme'
export function getTheme(): ThemeKey {
  const saved = (localStorage.getItem(STORAGE_KEY) as ThemeKey|null)
  return saved && THEMES.includes(saved) ? saved : 'pink'
}
export function setTheme(t: ThemeKey) {
  localStorage.setItem(STORAGE_KEY, t)
  document.documentElement.setAttribute('data-theme', t)
  if (typeof document !== 'undefined' && document.body) {
    document.body.setAttribute('data-theme', t)
  }
}
export function initTheme() {
  setTheme(getTheme())
}
export function nextTheme(current: ThemeKey): ThemeKey {
  const i = THEMES.indexOf(current)
  return THEMES[(i+1) % THEMES.length]
}
