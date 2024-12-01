import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null | undefined
  setToken: (token: string | null | undefined) => void
  refreshToken: string | null | undefined
  setRefreshToken: (token: string | null | undefined) => void
  tokenExpiry: { accessToken: number | null | undefined; refreshToken: number | null | undefined },
  setTokenExpiry: (expiry: { accessToken: number | null | undefined; refreshToken: number | null | undefined }) => void
  user: Record<string, any> | null | undefined
  setUser: (user: Record<string, any> | null | undefined) => void
  isStartLoggingOut: boolean | null | undefined
  setIsStartLoggingOut: (isLoggingOut: boolean) => void
  logOut: () => void
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null | undefined) => set({ token }),
      refreshToken: null,
      setRefreshToken: (token: string | null | undefined) => set({ refreshToken: token }),
      tokenExpiry: { accessToken: null, refreshToken: null },
      setTokenExpiry: (expiry: { accessToken: number | null | undefined; refreshToken: number | null | undefined }) =>
        set({ tokenExpiry: expiry }),
      user: null,
      setUser: (user: Record<string, any> | null | undefined) => set({ user }),
      isStartLoggingOut: false,
      setIsStartLoggingOut: (isLoggingOut: boolean) => set({ isStartLoggingOut: isLoggingOut }),
      logOut: () => {
        return set({ token: null, refreshToken: null, user: null, isStartLoggingOut: false, tokenExpiry: { accessToken: null, refreshToken: null } })
      },
    }),
    {
      name: "auth",
    }
  )
)

