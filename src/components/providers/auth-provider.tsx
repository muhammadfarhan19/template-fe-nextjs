'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service'

/**
 * AuthProvider hydrates the auth store on app mount by:
 * 1. Checking if there's an access_token cookie
 * 2. Fetching the current user profile to validate the session
 * 3. Clearing auth if the token is invalid / expired
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      clearAuth()
      return
    }

    // If we have a token but no user (e.g. after a hard refresh),
    // fetch the profile to rehydrate the store.
    if (!isAuthenticated) {
      authService
        .getProfile()
        .then((res) => {
          setAuth(res.data, token)
        })
        .catch(() => {
          clearAuth()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
