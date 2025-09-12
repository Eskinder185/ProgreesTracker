// src/pages/faq-data.tsx
import React from "react"

export const FAQ = [
  {
    q: "Where is my data stored?",
    a: <p>Your data is saved in your browser’s <b>localStorage</b>. Clearing site data or switching browsers/devices will reset it. (Ask if you want export/import added.)</p>
  },
  {
    q: "Is the AI free? Does it download anything?",
    a: <p>The default is a rule-based parser—free and instant. Optional <b>WebLLM</b> runs entirely in your browser and downloads a model once (cached after). No server or API cost.</p>
  },
  {
    q: "Can I use a cloud AI (like Google Gemini)?",
    a: <p>Yes—there’s an optional Gemini mode that uses Google’s free tier. It needs an API key restricted to your GitHub Pages domain.</p>
  },
  {
    q: "How do I mark things done?",
    a: <p>Check the box on a goal, or set a task’s status to <i>done</i>. You can also say things like “mark Exam 01 done” in chat.</p>
  },
  {
    q: "How is Overall Progress calculated?",
    a: <p>It’s the average of all goals’ progress (completed goals count as 100%).</p>
  },
  {
    q: "What is Time Remaining?",
    a: <p>Set a target date in <b>Settings</b>; the dashboard shows a live countdown.</p>
  },
]
