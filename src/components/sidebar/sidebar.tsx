'use client'

import React from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SidebarHeader } from './sidebar-header'
import { SidebarFooter } from './sidebar-footer'
import { NavSections } from './nav-section'
import { NAV_SECTIONS } from '@/config/nav.config'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Desktop Sidebar component.
 * Composes header, navigation, and footer.
 * Handles width transitions and collapse toggling.
 */
export function Sidebar() {
  const { isCollapsed, toggleCollapse } = useSidebar()

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'relative flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out hidden md:flex',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarHeader />
        
        <NavSections sections={NAV_SECTIONS} />

        <SidebarFooter />

        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-3 w-3" />
          ) : (
            <PanelLeftClose className="h-3 w-3" />
          )}
        </Button>
      </aside>
    </TooltipProvider>
  )
}
