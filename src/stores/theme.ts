import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const themeStore = create<ThemeProviderState>()(
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

