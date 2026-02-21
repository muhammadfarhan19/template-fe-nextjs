import { redirect } from 'next/navigation'

/**
 * Root index redirects to /dashboard.
 * Middleware will redirect to /login if unauthenticated.
 */
export default function RootPage() {
  redirect('/dashboard')
}
