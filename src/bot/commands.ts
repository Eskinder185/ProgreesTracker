import { parseISO, isValid } from "date-fns"
export type BotResult =
  | { type: "reply"; text: string }
  | { type: "error"; text: string }

export interface Parsed {
  intent:
    | "markDoneGoal" | "markDoneTask"
    | "setProgress"
    | "addTask"
    | "showStats"
}
export function parseCommand(input: string): Parsed & Record<string, any> | null {
  const msg = input.trim()

  // show stats
  if (/^(show|view|what.*) stats?/i.test(msg)) return { intent: "showStats" }

  // mark goal done / complete
  let m = msg.match(/^(mark|set)\s+(goal\s+)?(.+?)\s+(done|completed?)$/i)
  if (m) return { intent: "markDoneGoal", title: m[3].trim() }

  // mark task done
  m = msg.match(/^(mark|set)\s+task\s+(.+?)\s+(done|completed?)$/i)
  if (m) return { intent: "markDoneTask", title: m[2].trim() }

  // set progress {title} to 50%
  m = msg.match(/^set\s+progress\s+(.+?)\s+to\s+(\d{1,3})\s*%?$/i)
  if (m) return { intent: "setProgress", title: m[1].trim(), value: Math.max(0, Math.min(100, parseInt(m[2],10))) }

  // add task {title} due YYYY-MM-DD (optional) in {category}
  m = msg.match(/^add\s+task\s+(.+?)(?:\s+due\s+(\d{4}-\d{2}-\d{2}))?(?:\s+in\s+(.+))?$/i)
  if (m) {
    const title = m[1].trim()
    const due = m[2]?.trim()
    const category = m[3]?.trim() as any
    let dueISO: string | undefined = undefined
    if (due) {
      const d = parseISO(due); if (isValid(d)) dueISO = due
    }
    return { intent: "addTask", title, due: dueISO, category }
  }

  return null
}
