import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Goal, Task, Category } from '../types'
import { clamp } from '../utils/number'
import { uid } from '../utils/uid'

type State = {
  goals:Goal[]; tasks:Task[];
  addGoal(g: Omit<Goal,'id'|'completed'> & Partial<Pick<Goal,'completed'|'progress'>>): void
  updateGoal(id:string, patch: Partial<Omit<Goal,'id'>>): void
  deleteGoal(id:string): void
  toggleGoal(id:string): void
  setGoalProgress(id:string,pct:number): void

  addTask(t: Omit<Task,'id'|'status'> & Partial<Pick<Task,'status'>>): void
  setTaskStatus(id:string,status:Task['status']): void
  deleteTask(id:string): void

  byCategory(cat:Category):{goals:Goal[];tasks:Task[]}
  stats():{totalGoals:number;doneGoals:number;overallProgress:number;categories:number}
}

type Store = State

export const useTracker = create<State>()(
  persist(
    (set,get)=>({
      // Start EMPTY (remove placeholder data)
      goals: [],
      tasks: [],

      addGoal: (g) => set(s => ({ goals: [{ id: uid(), completed:false, progress:0, ...g }, ...s.goals] })),
      updateGoal: (id, patch) => set(s => ({ goals: s.goals.map(x=>x.id===id ? { ...x, ...patch } : x) })),
      deleteGoal: (id) => set(s => ({ goals: s.goals.filter(x=>x.id!==id) })),
      toggleGoal: (id) => set(s => ({ goals: s.goals.map(g=>g.id===id?{...g,completed:!g.completed, progress: g.completed? (g.progress ?? 0) : 100 }:g) })),
      setGoalProgress: (id,pct) => set(s => ({ goals: s.goals.map(g=>g.id===id?{...g,progress: clamp(pct,0,100)}:g) })),

      addTask: (t) => set(s => ({ tasks: [{ id: uid(), status: t.status ?? 'todo', ...t }, ...s.tasks] })),
      setTaskStatus: (id,status) => set(s => ({ tasks: s.tasks.map(t => t.id===id ? { ...t, status } : t) })),
      deleteTask: (id) => set(s => ({ tasks: s.tasks.filter(x=>x.id!==id) })),

      byCategory: cat => ({ goals: get().goals.filter(g=>g.category===cat), tasks: get().tasks.filter(t=>t.category===cat) }),
      stats: () => {
        const g = get().goals
        const total = g.length
        const done = g.filter(x => x.completed).length
        const avg = total ? Math.round(g.reduce((a,x)=>a+(x.progress ?? (x.completed?100:0)),0)/total) : 0
        const cats = new Set(g.map(x => x.category)).size
        return { totalGoals: total, doneGoals: done, overallProgress: avg, categories: cats }
      }
    }),
    // bump storage key to reset any old placeholder data
    { name: 'pt/v2', storage: createJSONStorage(()=>localStorage) }
  )
);