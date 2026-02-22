'use client'

import React from 'react'
import { LogOut, ChevronUp } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useLogout } from '@/hooks/use-auth-mutations'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * Sidebar Footer component.
 * Shows user profile and logout button.
 */
export function SidebarFooter() {
  const { user } = useAuth()
  const { mutate: logout, isPending } = useLogout()
  const { isCollapsed } = useSidebar()

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <div className={cn(
      'border-t p-4 transition-all duration-300',
      isCollapsed ? 'px-2' : 'p-4'
    )}>
      <div className={cn(
        'flex items-center gap-3',
        isCollapsed ? 'flex-col gap-4' : 'flex-row'
      )}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-sm">
          {userInitial}
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="text-sm font-medium text-foreground truncate">
              {user?.name || 'User'}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        )}

        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
                onClick={() => logout()}
                disabled={isPending}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Log out</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground shrink-0"
            onClick={() => logout()}
            disabled={isPending}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
