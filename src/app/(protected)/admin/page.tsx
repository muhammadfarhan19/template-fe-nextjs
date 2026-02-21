import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel',
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">This page is restricted to the ADMIN role.</p>
      </div>

      <div className="rounded-xl border border-dashed bg-card p-12 text-center shadow-sm">
        <p className="text-4xl">🛡️</p>
        <p className="mt-2 font-semibold">You have admin access</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Build admin-specific features here.
        </p>
      </div>
    </div>
  )
}
