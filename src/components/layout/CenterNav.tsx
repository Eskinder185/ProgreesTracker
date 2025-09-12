import { NavLink } from "react-router-dom"

const LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/life-goals", label: "Life Goals" },
  { to: "/academic-tasks", label: "Academic Tasks" },
  { to: "/project-timeline", label: "Project Timeline" },
  { to: "/settings", label: "Settings" },
]

export default function CenterNav(){
  return (
    <div className="w-full flex justify-center">
      <div className="segment">
        {LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `segment-btn ${isActive ? "segment-btn--active" : "segment-btn--idle"} hover-glow`
            }
            aria-label={link.label}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

