import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '403 – Unauthorized',
}

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-6xl font-extrabold text-destructive">403</p>
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-muted-foreground">
        You don&apos;t have permission to access this page.
      </p>
      <Link
        href="/dashboard"
        className="mt-2 inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
