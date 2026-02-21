import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── Route Configuration ─────────────────────────────────────────────────────

/** Routes accessible without authentication */
export const publicRoutes = ['/login', '/register']

/** Routes that require authentication */
export const protectedRoutes = ['/dashboard', '/admin', '/profile', '/settings']

/**
 * Routes that require specific roles.
 * If a user is authenticated but lacks the required role,
 * they will be redirected to /unauthorized.
 */
export const routeRoleMap: Record<string, string[]> = {
  '/admin': ['ADMIN'],
}

const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => pathname.startsWith(route))
}

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

function getRequiredRoles(pathname: string): string[] {
  for (const [route, roles] of Object.entries(routeRoleMap)) {
    if (pathname.startsWith(route)) return roles
  }
  return []
}

/**
 * Decode JWT payload without verifying signature.
 * Signature verification happens server-side in API routes.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64Payload = token.split('.')[1]
    if (!base64Payload) return null
    const json = Buffer.from(base64Payload, 'base64').toString('utf-8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

function isTokenExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined
  if (!exp) return true
  return Date.now() >= exp * 1000
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value

  const hasToken = !!token
  const payload = hasToken ? decodeJwtPayload(token) : null
  const isValidToken = payload !== null && !isTokenExpired(payload)
  const userRoles: string[] = Array.isArray(payload?.roles) ? (payload.roles as string[]) : []

  // ── 1. Authenticated user hitting a public (auth) route → redirect to dashboard
  if (isPublicRoute(pathname) && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ── 2. Unauthenticated user hitting a protected route → redirect to login
  if (isProtectedRoute(pathname) && !isValidToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── 3. RBAC: authenticated but missing required role → redirect to unauthorized
  if (isProtectedRoute(pathname) && isValidToken) {
    const requiredRoles = getRequiredRoles(pathname)
    if (requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) => userRoles.includes(role))
      if (!hasRole) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/).*)',
  ],
}
