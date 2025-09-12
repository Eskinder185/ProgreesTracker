import { useTracker } from "../store/goals"
import type { BotResult } from "./commands"
import { parseCommand } from "./commands"

function findGoalLike(title: string) {
  const { goals } = useTracker.getState()
  const t = title.toLowerCase()
  return goals.find(g => g.title.toLowerCase().includes(t))
}
function findTaskLike(title: string) {
  const { tasks } = useTracker.getState()
  const t = title.toLowerCase()
  return tasks.find(x => x.title.toLowerCase().includes(t))
}

export async function handleUserMessage(input: string): Promise<BotResult> {
  const parsed = parseCommand(input)
  if (!parsed) {
    return { type: "reply", text:
      "I didn’t catch that. Try:\n• mark goal Gym 3x/week done\n• mark task Exam 01 done\n• set progress LinkedIn to 40%\n• add task County Assessment due 2025-09-20 in Academic / MPH\n• show stats" }
  }

  const s = useTracker.getState()

  switch (parsed.intent) {
    case "showStats": {
      const st = s.stats()
      return { type: "reply", text:
        `You’ve completed ${st.doneGoals}/${st.totalGoals} goals. Overall progress ${st.overallProgress}%. Categories: ${st.categories}.` }
    }
    case "markDoneGoal": {
      const g = findGoalLike(parsed.title)
      if (!g) return { type: "error", text: `Goal not found: "${parsed.title}".` }
      if (!g.completed) s.toggleGoal(g.id)
      return { type: "reply", text: `Marked goal "${g.title}" as done.` }
    }
    case "markDoneTask": {
      const t = findTaskLike(parsed.title)
      if (!t) return { type: "error", text: `Task not found: "${parsed.title}".` }
      if (t.status !== "done") s.setTaskStatus(t.id, "done")
      return { type: "reply", text: `Marked task "${t.title}" as done.` }
    }
    case "setProgress": {
      const g = findGoalLike(parsed.title)
      if (!g) return { type: "error", text: `Goal not found: "${parsed.title}".` }
      s.setGoalProgress(g.id, parsed.value)
      return { type: "reply", text: `Set progress for "${g.title}" to ${parsed.value}%.` }
    }
    case "addTask": {
      s.addTask({ title: parsed.title, due: parsed.due, category: parsed.category })
      return { type: "reply", text:
        `Added task "${parsed.title}"${parsed.due ? ` due ${parsed.due}` : ""}${parsed.category ? ` in ${parsed.category}` : ""}.` }
    }
  }
}
