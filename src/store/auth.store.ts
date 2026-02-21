import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'js-cookie'

import type { Role, User } from '@/types/auth.types'

interface AuthState {
  user: User | null
  accessToken: string | null
  roles: Role[]
  isAuthenticated: boolean

  // Actions
  setAuth: (user: User, accessToken: string) => void
  setAccessToken: (token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      roles: [],
      isAuthenticated: false,

      setAuth: (user, accessToken) => {
        Cookies.set('access_token', accessToken, { sameSite: 'lax' })
        set({
          user,
          accessToken,
          roles: user.roles,
          isAuthenticated: true,
        })
      },

      setAccessToken: (token) => {
        Cookies.set('access_token', token, { sameSite: 'lax' })
        set({ accessToken: token })
      },

      clearAuth: () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        set({
          user: null,
          accessToken: null,
          roles: [],
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist user and roles — NOT the access token (security)
      partialize: (state) => ({
        user: state.user,
        roles: state.roles,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
