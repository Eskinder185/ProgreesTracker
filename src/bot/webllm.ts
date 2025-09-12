
import * as webllm from "@mlc-ai/web-llm"
import type { MLCEngine } from "@mlc-ai/web-llm"
import type { Parsed } from "./execute"

let engine: MLCEngine | null = null

// Use a smaller model for faster first-load
const MODEL = "Llama-3.2-3B-Instruct-q4f32_1-MLC" // alt: "Llama-3-8B-Instruct-q4f32_1-MLC"

function hasWebGPU() {
  return typeof navigator !== "undefined" && "gpu" in navigator
}

export async function initWebLLM(): Promise<MLCEngine | null> {
  if (!hasWebGPU()) return null
  if (engine) return engine
  engine = await webllm.CreateMLCEngine(MODEL, {
    initProgressCallback: (p) => {
      if (p.progress) {
        console.debug(`WebLLM loading: ${(p.progress * 100).toFixed(0)}%`)
      }
    },
  })
  return engine
}

const SYSTEM = `Return ONLY compact JSON (no prose) matching:
{"intent":"markDoneGoal|markDoneTask|setProgress|addTask|addGoal|showStats",
 "title?":"string","value?":0-100,"due?":"YYYY-MM-DD","category?":"string",
 "description?":"string","kind?":"goal|progress","progress?":0-100}`

function extractJSON(s: string): Parsed | null {
  const i = s.indexOf("{")
  const j = s.lastIndexOf("}")
  if (i < 0 || j < 0) return null
  try { return JSON.parse(s.slice(i, j + 1)) as Parsed } catch { return null }
}

export async function webllmParse(message: string): Promise<Parsed | null> {
  // If no WebGPU, signal the caller to fall back
  if (!hasWebGPU()) return null

  try {
    const llm = await initWebLLM()
    if (!llm) return null

    // optional timeout guard
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort("webllm-timeout"), 25000)

    const out = await llm.chat.completions.create(
      {
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: message },
        ],
        temperature: 0,
        signal: ctrl.signal as any
      }
    )

    clearTimeout(t)
    const text = String(out.choices?.[0]?.message?.content ?? "")
    return extractJSON(text)
  } catch (e) {
    console.warn("[webllmParse] falling back:", e)
    return null
  }
}