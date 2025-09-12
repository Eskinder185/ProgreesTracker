import { Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Dashboard from "./pages/Dashboard"
import LifeGoals from "./pages/LifeGoals"
import AcademicTasks from "./pages/AcademicTasks"
import ProjectTimeline from "./pages/ProjectTimeline"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import ChatFab from "./components/ui/ChatFab"
import About from "./pages/About"
import Faq from "./pages/Faq"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* no duplicate nav here anymore */}
      <main className="container-page w-full py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/life-goals" element={<LifeGoals />} />
          <Route path="/academic-tasks" element={<AcademicTasks />} />
          <Route path="/project-timeline" element={<ProjectTimeline />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatFab />
    </div>
  )
}

