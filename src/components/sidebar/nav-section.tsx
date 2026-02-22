'use client'

import React from 'react'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { NavItem } from './nav-item'
import { NavGroup } from './nav-group'
import type { NavSection } from '@/types/nav.types'

import { ChevronDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface NavSectionProps {
  section: NavSection
  showTitle?: boolean
}

/**
 * Renders a group of navigation items (a section).
 * The entire section is collapsible if a title is provided.
 * Auto-opens if any item within the section is active.
 */
export function NavSectionComponent({ section, showTitle = true }: NavSectionProps) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  
  // Check if any item in this section is active
  const isAnyItemActive = section.items.some(item => {
    if (item.href && (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))) return true
    if (item.children?.some(child => child.href && (child.href === '/' ? pathname === '/' : pathname.startsWith(child.href)))) return true
    return false
  })

  const [isOpen, setIsOpen] = useState(true)

  // Auto-open if an item becomes active
  useEffect(() => {
    if (isAnyItemActive) setIsOpen(true)
  }, [isAnyItemActive])

  const sectionContent = (
    <div className="space-y-1">
      {section.items.map((item, idx) => (
        item.children && item.children.length > 0 ? (
          <NavGroup key={idx} item={item} />
        ) : (
          <NavItem key={idx} item={item} />
        )
      ))}
    </div>
  )

  // If collapsed or no title, just render the items
  if (isCollapsed || !section.title || !showTitle) {
    return sectionContent
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="px-3 py-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between group outline-none">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 transition-colors group-hover:text-muted-foreground">
            {section.title}
          </h2>
          <ChevronDown className={cn(
            'h-3 w-3 text-muted-foreground/50 transition-transform duration-200 group-hover:text-muted-foreground',
            isOpen ? 'rotate-0' : '-rotate-90'
          )} />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-1 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {sectionContent}
      </CollapsibleContent>
    </Collapsible>
  )
}


interface NavRootProps {
  sections: NavSection[]
}

/**
 * Root component for rendering multiple navigation sections with separators.
 */
export function NavSections({ sections }: NavRootProps) {
  return (
    <nav className="flex-1 space-y-4 p-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
      {sections.map((section, idx) => (
        <React.Fragment key={idx}>
          <NavSectionComponent section={section} />
          {idx < sections.length - 1 && <Separator className="my-4 opacity-50" />}
        </React.Fragment>
      ))}
    </nav>
  )
}
