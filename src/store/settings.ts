import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  targetEndDate?: string | null
  setTargetEndDate: (iso?: string | null) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set)=>({
      targetEndDate: null,
      setTargetEndDate: (iso) => set({ targetEndDate: iso || null })
    }),
    { name: 'pt/settings/v1', storage: createJSONStorage(()=>localStorage) }
  )
)
