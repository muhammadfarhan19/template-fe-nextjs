import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  UserCircle,
  Settings,
  BarChart3,
  FileText,
} from 'lucide-react'
import type { NavSection } from '@/types/nav.types'

/**
 * Application navigation configuration.
 *
 * This is the **single source of truth** for all sidebar links.
 * Add, remove, or reorder items here — the sidebar renders automatically.
 *
 * RBAC: set `roles: ['ADMIN']` to restrict visibility to specific roles.
 * Nesting: provide `children` to create a collapsible group.
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    // Main navigation — visible to all authenticated users
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
      },
      {
        label: 'Reports',
        href: '/reports',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Administration',
    // The whole section is gated — only items with matching roles are shown
    items: [
      {
        label: 'User Management',
        icon: Users,
        roles: ['ADMIN'],
        children: [
          {
            label: 'All Users',
            href: '/admin/users',
            icon: Users,
            roles: ['ADMIN'],
          },
          {
            label: 'Roles & Permissions',
            href: '/admin/roles',
            icon: ShieldCheck,
            roles: ['ADMIN'],
          },
        ],
      },
      {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        roles: ['ADMIN'],
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        label: 'Profile',
        href: '/profile',
        icon: UserCircle,
      },
    ],
  },
]
