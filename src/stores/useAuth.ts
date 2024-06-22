import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null | undefined
  setToken: (token: string | null | undefined) => void
  user: Record<string, any> | null | undefined
  setUser: (user: Record<string, any> | null | undefined) => void
  logOut: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null | undefined) => set({ token }),
      user: null,
      setUser: (user: Record<string, any> | null | undefined) => set({ user }),
      logOut: () => {
        return setTimeout(() => {
          set({ token: null, user: null })
        }, 1000)
      },
    }),
    {
      name: "auth",
    }
  )
)

