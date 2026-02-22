'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { useSidebar } from '@/hooks/use-sidebar'
import { usePermission } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { NavItem } from './nav-item'
import type { NavItem as NavItemType } from '@/types/nav.types'

interface NavGroupProps {
  item: NavItemType
}

/**
 * Renders a collapsible group of navigation items.
 * Handles:
 * - RBAC (hides group if user lacks role)
 * - Auto-expansion when a child is active
 * - Collapsed mode behavior
 */
export function NavGroup({ item }: NavGroupProps) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  const hasPermission = usePermission(item.roles || [])
  
  // Check if any child is active
  const isAnyChildActive = item.children?.some(child => 
    child.href && (child.href === '/' ? pathname === '/' : pathname.startsWith(child.href))
  )

  const [isOpen, setIsOpen] = useState(isAnyChildActive)

  // Sync open state when path changes (e.g. navigation via other means)
  useEffect(() => {
    if (isAnyChildActive) setIsOpen(true)
  }, [isAnyChildActive])

  if (!hasPermission || !item.children?.length) return null

  const Icon = item.icon

  const trigger = (
    <CollapsibleTrigger asChild>
      <button
        className={cn(
          'group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all outline-none',
          'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          isCollapsed ? 'justify-center px-2' : 'px-3',
          isOpen && !isCollapsed && 'text-foreground'
        )}
      >
        {Icon && <Icon className="h-4 w-4 shrink-0 transition-colors group-hover:text-accent-foreground" />}
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            <ChevronRight className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-90')} />
          </>
        )}
      </button>
    </CollapsibleTrigger>
  )

  if (isCollapsed && Icon) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="flex flex-col gap-1">
             {/* In collapsed mode, groups act like icons that maybe popover or just indicate nesting */}
             {/* For now, we'll just show the icon and label in tooltip. */}
             {/* A more advanced impl would show children in a popover. */}
             {trigger}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="p-0 border-none shadow-none bg-transparent">
           <div className="flex flex-col gap-1 ml-4 p-2 rounded-md border bg-popover text-popover-foreground shadow-md min-w-[150px]">
             <div className="px-2 py-1.5 text-xs font-semibold border-b mb-1">{item.label}</div>
             {item.children.map((child, idx) => (
                <NavItem key={idx} item={child} isChild />
             ))}
           </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      {trigger}
      <CollapsibleContent className="space-y-1 pt-1 ml-4 border-l pl-2 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {item.children.map((child, idx) => (
          <NavItem key={idx} item={child} isChild />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
