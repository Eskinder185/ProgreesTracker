import { useTracker } from "../store/goals"

export type Parsed = {
  intent:
    | "markDoneGoal"
    | "markDoneTask"
    | "setProgress"
    | "addTask"
    | "addGoal"          // <- NEW
    | "showStats"
  title?: string
  value?: number          // for setProgress
  due?: string            // for addTask
  category?: string
  description?: string
  kind?: "goal" | "progress" // for addGoal
  progress?: number          // for addGoal (initial %)
}

export function execute(parsed: Parsed){
  const s = useTracker.getState()

  switch (parsed.intent) {
    case "showStats": {
      const st = s.stats()
      return `You’ve completed ${st.doneGoals}/${st.totalGoals} goals. Overall progress ${st.overallProgress}%.`
    }
    case "markDoneGoal": {
      if (!parsed.title) return "Which goal?"
      const t = parsed.title.toLowerCase()
      const g = s.goals.find(x=>x.title.toLowerCase().includes(t))
      if (!g) return `Goal not found: "${parsed.title}".`
      if (!g.completed) s.toggleGoal(g.id)
      return `Marked goal "${g.title}" as done.`
    }
    case "markDoneTask": {
      if (!parsed.title) return "Which task?"
      const t = parsed.title.toLowerCase()
      const item = s.tasks.find(x=>x.title.toLowerCase().includes(t))
      if (!item) return `Task not found: "${parsed.title}".`
      if (item.status!=='done') s.setTaskStatus(item.id,'done')
      return `Marked task "${item.title}" as done.`
    }
    case "setProgress": {
      if (!parsed.title || typeof parsed.value!=='number') return "Give title and %."
      const t = parsed.title.toLowerCase()
      const g = s.goals.find(x=>x.title.toLowerCase().includes(t))
      if (!g) return `Goal not found: "${parsed.title}".`
      s.setGoalProgress(g.id, parsed.value)
      return `Set progress for "${g.title}" to ${parsed.value}%.`
    }
    case "addTask": {
      if (!parsed.title) return "Give a task title."
      s.addTask({
        title: parsed.title,
        due: parsed.due,
        category: parsed.category as any
      })
      return `Added task "${parsed.title}"${parsed.due?` due ${parsed.due}`:''}${parsed.category?` in ${parsed.category}`:''}.`
    }
    case "addGoal": {
      if (!parsed.title) return "Give a goal title."
      s.addGoal({
        title: parsed.title,
        description: parsed.description,
        category: (parsed.category as any) ?? "Academic / MPH",
        progress: typeof parsed.progress === 'number' ? parsed.progress : 0,
        kind: parsed.kind ?? "goal"
      })
      const label = parsed.kind === 'progress' ? 'progress' : 'goal'
      return `Added ${label} "${parsed.title}"${parsed.category?` in ${parsed.category}`:''}${typeof parsed.progress==='number'?` at ${parsed.progress}%`:''}.`
    }
  }
}