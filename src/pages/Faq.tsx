// src/pages/Faq.tsx
import React from "react"
import { FAQ } from "./faq-data"

export default function Faq() {
  return (
    <div className="prose mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-4 accent-text">Frequently Asked Questions</h1>
      <ul className="space-y-6">
        {FAQ.map((item, i) => (
          <li key={i} className="mb-6">
            <div className="font-semibold mb-1 text-accent-700">{item.q}</div>
            <div className="text-base text-slate-700 bg-slate-50 rounded-lg p-3 shadow-sm">{item.a}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
