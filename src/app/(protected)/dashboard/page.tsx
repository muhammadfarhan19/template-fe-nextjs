import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your overview.</p>
      </div>

      {/* Stat cards placeholder */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Total Users', 'Revenue', 'Active Sessions', 'Conversion Rate'].map((title) => (
          <div key={title} className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">—</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Quick links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/admin" className="text-primary hover:underline">
              Admin Panel (ADMIN role required)
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-primary hover:underline">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
