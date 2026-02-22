'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Slot } from '@radix-ui/react-slot'
import { useSidebar } from '@/hooks/use-sidebar'
import { usePermission } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { NavItem as NavItemType } from '@/types/nav.types'

interface NavItemProps {
  item: NavItemType
  isChild?: boolean
}

/**
 * Renders a single navigation link.
 * Handles:
 * - RBAC (hides item if user lacks role)
 * - Active state (exact or partial match)
 * - Collapsed mode (shows only icon + tooltip)
 * - Badges
 */
export function NavItem({ item, isChild = false }: NavItemProps) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  const hasPermission = usePermission(item.roles || [])

  if (!hasPermission) return null

  const isActive = item.href ? (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) : false
  const Icon = item.icon

  const content = (
    <Link
      href={item.disabled ? '#' : (item.href || '#')}
      className={cn(
        'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all outline-none',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        item.disabled && 'opacity-50 pointer-events-none',
        isCollapsed && !isChild ? 'justify-center px-2' : 'px-3'
      )}
    >
      {Icon && <Icon className={cn('h-4 w-4 shrink-0', isActive ? '' : 'text-muted-foreground group-hover:text-accent-foreground')} />}
      
      {(!isCollapsed || isChild) && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span className={cn(
              'ml-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
              isActive ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )

  // In collapsed mode, wrap in tooltip if it's a top-level item with an icon
  if (isCollapsed && !isChild && Icon) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.label}
          {item.badge && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">{item.badge}</span>}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
