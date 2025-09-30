# ZeroEffort Tracker

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f)](https://Eskinder185.github.io/ProgreesTracker/)
![Built with](https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-blue)
![UI](https://img.shields.io/badge/UI-TailwindCSS-38bdf8)
![Store](https://img.shields.io/badge/State-Zustand-5b5)
![Privacy](https://img.shields.io/badge/Privacy-Local--only-informational)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

Make goals → track progress → finish stuff — **with zero hassle**.  
Beautiful themes, a friendly chat assistant, and everything saved **locally** in your browser.

[🌐 Live Demo](https://Eskinder185.github.io/ProgreesTracker/) · [❓FAQ](#-faq) · [✨Themes](#-themes) · [🚀Deploy](#-deploy-to-github-pages)

---

## 💛 Why you’ll love it

- **Goals, Progress & Tasks** — add manually or via the **chatbot** (type “add goal …” or use Quick Add).
- **One-click Themes** — pink, violet, sky, emerald, rose, amber, indigo.
- **Action Tray** — sticky, stylish `+Goal` / `+Progress` / `+Task` pills.
- **Real KPIs** — Completed Goals, Overall Progress, Categories, Time Remaining.
- **Private by default** — stored in `localStorage` (no account).
- **Optional AI**
  - **Local (free):** WebLLM runs entirely in your browser (no keys).
  - **Cloud (free tier):** Gemini support if you want it.

---

## 🖼 Screenshots

| Dashboard | Chat + Quick Add | Themes |
|---|---|---|
| ![Dashboard](./screenshots/dashboard.png) | ![Chat](./screenshots/chat.png) | ![Themes](./screenshots/themes.png) |

> Don’t have screenshots yet? Create a `screenshots/` folder and drop images with those names.

---

## 🧩 Tech Stack

- **React + Vite** (fast dev, tiny bundles)
- **Tailwind CSS** (themeable UI, hover glow)
- **Zustand** (tiny global store for goals/tasks/settings)
- **WebLLM** *(optional)* — local AI via WebGPU (fully on-device)
- **Gemini** *(optional)* — cloud AI (free tier) with API key

---

## 🚀 Quick Start

### Windows (PowerShell)
```powershell
# 1) Clone and install
git clone https://github.com/Eskinder185/ProgreesTracker.git
cd ProgreesTracker
npm.cmd install

# 2) Run dev server
npm.cmd run dev
# open displayed localhost URL

