import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import type { LoginCredentials, RegisterCredentials } from '@/types/auth.types'
import { getErrorMessage } from '@/lib/utils'

/**
 * Mutation hook for logging in.
 */
export function useLogin() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      const { user, accessToken } = response.data
      setAuth(user, accessToken)
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('[useLogin] error:', getErrorMessage(error))
    },
  })
}

/**
 * Mutation hook for registering.
 */
export function useRegister() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: (response) => {
      const { user, accessToken } = response.data
      setAuth(user, accessToken)
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('[useRegister] error:', getErrorMessage(error))
    },
  })
}

/**
 * Mutation hook for logging out.
 */
export function useLogout() {
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearAuth()
      queryClient.clear()
      router.push('/login')
    },
  })
}
