  ZeroEffort Tracker

Make goals → track progress → finish stuff — **with zero hassle**.  
Beautiful themes, a friendly chat assistant, and everything saved **locally** in your browser.

[🌐 Live Demo](https://Eskinder185.github.io/ProgreesTracker/) · [❓FAQ](#-faq) · [✨Themes](#-themes) · [🚀Deploy](#-deploy-to-github-pages)

---

##  Why you’ll love it

- **Goals, Progress & Tasks** — add manually or via the **chatbot** (type “add goal …” or use Quick Add).
- **One-click Themes** — pink, violet, sky, emerald, rose, amber, indigo.
- **Action Tray** — sticky, stylish +Goal / +Progress / +Task pills.
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
- **WebLLM** *(optional)* — local AI that runs via WebGPU
- **Gemini** *(optional)* — cloud AI (free tier) with API key

---

##  Quick Start (Windows PowerShell)

```powershell
# 1) Clone and install
git clone https://github.com/Eskinder185/ProgreesTracker.git
cd ProgreesTracker
npm.cmd install

