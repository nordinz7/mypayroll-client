import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null | undefined
  setToken: (token: string | null | undefined) => void
  refreshToken: string | null | undefined
  setRefreshToken: (token: string | null | undefined) => void
  user: Record<string, any> | null | undefined
  setUser: (user: Record<string, any> | null | undefined) => void
  isStartLoggingOut: boolean | null | undefined
  setStartLoggingOut: (isLoggingOut: boolean) => void
  logOut: () => void
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null | undefined) => set({ token }),
      refreshToken: null,
      setRefreshToken: (token: string | null | undefined) => set({ refreshToken: token }),
      user: null,
      setUser: (user: Record<string, any> | null | undefined) => set({ user }),
      isStartLoggingOut: false,
      setStartLoggingOut: (isLoggingOut: boolean) => set({ isStartLoggingOut: isLoggingOut }),
      logOut: () => {
        return setTimeout(() => {
          set({ token: null, refreshToken: null, user: null, isStartLoggingOut: false })
        }, 1000)
      },
    }),
    {
      name: "auth",
    }
  )
)

