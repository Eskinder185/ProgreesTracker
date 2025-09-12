import type { Goal, Task } from '../types'
export const sampleGoals: Goal[] = [
  { id:'g1', title:'Stay on top of weekly assignments', category:'Academic / MPH', completed:false, progress:50 },
  { id:'g2', title:'Revamp LinkedIn with projects & certs', category:'Professional', completed:false, progress:20 },
  { id:'g3', title:'Secure 1 consistent volunteer role', category:'Volunteering', completed:false, progress:0 },
  { id:'g4', title:'Complete 2 certifications before Jan 2026', category:'Skills & Certs', completed:false, progress:33 },
  { id:'g5', title:'Contact APE coordinator for Spring', category:'APE', completed:false, progress:0 },
  { id:'g6', title:'Gym 3x/week', category:'Health & Personal', completed:true, progress:100 },
  { id:'g7', title:'Make steady debt repayments', category:'Financial', completed:false, progress:33 },
  { id:'g8', title:'Practice public speaking monthly', category:'Personal Growth', completed:false, progress:10 },
]
export const sampleTasks: Task[] = [
  { id:'t1', title:'Module 03 Journal Entry', due:'2025-09-13', description:'EQ assessments & reflection', category:'Academic / MPH', status:'todo', urgent:true, tags:['journal'] },
  { id:'t2', title:'Exam 01 (Modules 1–4)', due:'2025-09-16', description:'2-hr, LockDown Browser', category:'Academic / MPH', status:'todo', urgent:true, tags:['exam'] },
  { id:'t3', title:'County Assessment (Module 02)', due:'2025-09-20', category:'Academic / MPH', status:'todo' },
  { id:'t4', title:'Post LinkedIn project update', due:'2025-09-15', category:'Professional', status:'todo' },
  { id:'t5', title:'Volunteer opportunity shortlist', due:'2025-09-25', category:'Volunteering', status:'todo' }
]

