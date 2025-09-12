// src/pages/About.tsx
import React from "react"

export default function About() {
  return (
    <div className="prose mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-4 accent-text">About ZeroEffort Tracker</h1>
      <p className="text-lg text-slate-700 mb-4">
        ZeroEffort Tracker is a <b className="accent-text">privacy-first</b>, browser-based app for tracking your goals, progress, and tasks. All your data stays in your browser—nothing is sent to a server.
      </p>
      <ul className="list-disc pl-6 mb-4 text-base text-slate-600">
        <li>Fast, simple, and works offline</li>
        <li>Optional local AI (WebLLM) for natural language commands</li>
        <li>Rule-based parser is always free and instant</li>
        <li>Open source and customizable</li>
      </ul>
      <p className="text-base text-slate-500">
        Built with <span className="font-semibold">React</span>, <span className="font-semibold">Zustand</span>, and <span className="font-semibold">Tailwind</span>.<br/>
        <span className="italic">Your feedback and contributions are welcome!</span>
      </p>
    </div>
  )
}
