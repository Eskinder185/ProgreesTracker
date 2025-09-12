import clsx from "clsx"
import type { ReactNode } from "react"

export default function TagPill({
  children, count, active, title, onClick
}: {
  children: ReactNode
  count?: number
  active?: boolean
  title?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={!!active}
      onClick={onClick}
      className={clsx(
        "hover-glow inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 ring-fuchsia-300",
        active
          ? "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200"
          : "bg-white text-slate-700 border-slate-200"
      )}
    >
      <span className="leading-none">{children}</span>
      {typeof count === "number" && (
        <span className={clsx(
          "ml-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full px-1 text-[11px] font-medium",
          active ? "bg-fuchsia-200 text-fuchsia-800" : "bg-slate-100 text-slate-600"
        )}>
          {count}
        </span>
      )}
    </button>
  )
}
