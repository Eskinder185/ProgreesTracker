import type { Category } from "../types"
import type { LucideIcon } from "lucide-react"
import {
  GraduationCap, BriefcaseBusiness, HandHeart, BadgeCheck, FlaskConical,
  Activity, CircleDollarSign, Sparkles, Trophy
} from "lucide-react"

export type Meta = {
  icon: LucideIcon
  bgClass: string
  accentClass: string
  description: string
}

export const CATEGORY_META: Record<Category, Meta> = {
  "Academic / MPH": {
    icon: GraduationCap,
    bgClass: "bg-academic",
    accentClass: "text-indigo-700",
    description: "Coursework, journals, exams, and academic milestones."
  },
  "Professional": {
    icon: BriefcaseBusiness,
    bgClass: "bg-professional",
    accentClass: "text-slate-800",
    description: "Career branding, portfolio updates, networking cadence."
  },
  "Volunteering": {
    icon: HandHeart,
    bgClass: "bg-volunteering",
    accentClass: "text-cyan-700",
    description: "Consistent roles and community service opportunities."
  },
  "Skills & Certs": {
    icon: BadgeCheck,
    bgClass: "bg-skills",
    accentClass: "text-amber-700",
    description: "Technical tools, certifications, and micro-projects."
  },
  "APE": {
    icon: FlaskConical,
    bgClass: "bg-ape",
    accentClass: "text-rose-700",
    description: "Applied Practice Experience planning and hours."
  },
  "Health & Personal": {
    icon: Activity,
    bgClass: "bg-health",
    accentClass: "text-lime-700",
    description: "Daily movement, routines, and personal wellbeing."
  },
  "Financial": {
    icon: CircleDollarSign,
    bgClass: "bg-financial",
    accentClass: "text-sky-700",
    description: "Savings targets, repayments, and credit hygiene."
  },
  "Personal Growth": {
    icon: Sparkles,
    bgClass: "bg-growth",
    accentClass: "text-fuchsia-700",
    description: "Confidence, public speaking, and reflection habits."
  },
}

export const ALL_META = {
  icon: Trophy,
  bgClass: "bg-all",
  accentClass: "text-fuchsia-700",
  description: "Overview across every category."
}

