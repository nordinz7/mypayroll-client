import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum Theme {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useTheme = create<ThemeProviderState>()(
  persist(
    (set) => ({
      theme: Theme.system,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme",
    }
  )
)

