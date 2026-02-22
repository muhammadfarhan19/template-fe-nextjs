'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'

/**
 * Sidebar Header component.
 * Displays logo and app name, hides name in collapsed mode.
 */
export function SidebarHeader() {
  const { isCollapsed } = useSidebar()

  return (
    <div className={cn(
      'flex h-14 items-center border-b px-6 transition-all duration-300',
      isCollapsed ? 'justify-center px-2' : 'px-6'
    )}>
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        {!isCollapsed && (
          <span className="font-bold tracking-tight text-foreground whitespace-nowrap">
            Template App
          </span>
        )}
      </div>
    </div>
  )
}
