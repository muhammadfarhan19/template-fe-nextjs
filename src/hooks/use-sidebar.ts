'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isOpen: boolean      // Mobile sheet state
  isCollapsed: boolean // Desktop collapsed state
  toggle: () => void
  setOpen: (open: boolean) => void
  toggleCollapse: () => void
  close: () => void
}

/**
 * Hook to manage sidebar state (open, collapsed).
 * Persists the collapsed state to localStorage so it's remembered across reloads.
 */
export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      isCollapsed: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'sidebar-storage',
      // Only persist the collapsed state
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
    }
  )
)
