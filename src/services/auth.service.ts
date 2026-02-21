import api from '@/lib/axios'
import type { ApiResponse } from '@/types/api.types'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth.types'

export const authService = {
  /**
   * Login with email and password.
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials)
    return data
  },

  /**
   * Register a new user account.
   */
  async register(credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> {
    const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', credentials)
    return data
  },

  /**
   * Logout the current user — invalidates the server-side session.
   */
  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },

  /**
   * Refresh access token using the refresh token cookie.
   */
  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const { data } = await api.post<ApiResponse<{ accessToken: string }>>('/auth/refresh')
    return data
  },

  /**
   * Get the current authenticated user's profile.
   */
  async getProfile(): Promise<ApiResponse<AuthResponse['user']>> {
    const { data } = await api.get<ApiResponse<AuthResponse['user']>>('/auth/me')
    return data
  },
}
