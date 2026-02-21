import { useAuthStore } from '@/store/auth.store'
import type { Role } from '@/types/auth.types'

/**
 * Returns the current auth state and actions from the auth store.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const roles = useAuthStore((s) => s.roles)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const accessToken = useAuthStore((s) => s.accessToken)
  const setAuth = useAuthStore((s) => s.setAuth)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return {
    user,
    roles,
    isAuthenticated,
    accessToken,
    setAuth,
    clearAuth,
  }
}

/**
 * Returns true if the current user has at least one of the required roles.
 */
export function usePermission(requiredRoles: Role[]): boolean {
  const roles = useAuthStore((s) => s.roles)
  if (!requiredRoles.length) return true
  return requiredRoles.some((role) => roles.includes(role))
}
