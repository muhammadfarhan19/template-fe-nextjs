'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLogout } from '@/hooks/use-auth-mutations'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' },
  { href: '/profile', label: 'Profile' },
]

function Sidebar() {
  const pathname = usePathname()
  const { mutate: logout, isPending } = useLogout()

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-6">
        <span className="font-bold tracking-tight">⚡ App</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="inline-flex h-9 w-full items-center justify-center rounded-md border text-sm font-medium transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? 'Logging out…' : 'Log out'}
        </button>
      </div>
    </aside>
  )
}

function Header() {
  const { user } = useAuth()
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div />
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{user?.email}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
      </div>
    </header>
  )
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
