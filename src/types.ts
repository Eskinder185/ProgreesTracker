export type Category =
  | 'Academic / MPH' | 'Professional' | 'Volunteering' | 'Skills & Certs'
  | 'APE' | 'Health & Personal' | 'Financial' | 'Personal Growth'

export const CATEGORIES: Category[] = [
  'Academic / MPH','Professional','Volunteering','Skills & Certs',
  'APE','Health & Personal','Financial','Personal Growth'
]

export interface Goal {
  id: string
  title: string
  description?: string
  category: Category
  completed: boolean
  progress?: number // 0-100
  /** NEW: distinguish a normal goal vs a progress tracker */
  kind?: 'goal' | 'progress'
}

export interface Task {
  id: string
  title: string
  due?: string
  description?: string
  category?: Category
  status: 'todo' | 'doing' | 'done'
  urgent?: boolean
  tags?: string[]
}
