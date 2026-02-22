'use client'

import React from 'react'
import { Menu } from 'lucide-react'
import { useSidebar } from '@/hooks/use-sidebar'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SidebarHeader } from './sidebar-header'
import { NavSections } from './nav-section'
import { SidebarFooter } from './sidebar-footer'
import { NAV_SECTIONS } from '@/config/nav.config'
import { TooltipProvider } from '@/components/ui/tooltip'

/**
 * Mobile Sidebar component.
 * Uses shadcn Sheet for an off-canvas drawer.
 * Triggered by the hamburger Menu icon.
 */
export function MobileSidebar() {
  const { isOpen, setOpen } = useSidebar()

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 flex flex-col">
          <TooltipProvider>
            <SidebarHeader />
            <div className="flex-1 overflow-y-auto">
              <NavSections sections={NAV_SECTIONS} />
            </div>
            <SidebarFooter />
          </TooltipProvider>
        </SheetContent>
      </Sheet>
    </div>
  )
}
