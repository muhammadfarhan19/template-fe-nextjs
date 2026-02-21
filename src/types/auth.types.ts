export type Role = 'ADMIN' | 'USER' | 'MODERATOR'

export interface User {
  id: string
  name: string
  email: string
  roles: Role[]
  avatar?: string
  createdAt?: string
}

export interface TokenPayload {
  sub: string
  email: string
  roles: Role[]
  iat: number
  exp: number
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}
