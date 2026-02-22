import type { LucideIcon } from 'lucide-react'
import type { Role } from './auth.types'

/**
 * Represents a single navigation item in the sidebar.
 *
 * - If `children` is provided, it renders as a collapsible group (no `href` needed on parent).
 * - If `roles` is provided, the item is only visible to users with at least one matching role.
 * - If `disabled` is true, the item is rendered but non-interactive.
 */
export interface NavItem {
  /** Display label for the nav item */
  label: string
  /** Route path. Required for leaf items; optional for group parents. */
  href?: string
  /** Lucide icon component */
  icon?: LucideIcon
  /**
   * Roles that can see this item.
   * If omitted (undefined), the item is visible to all authenticated users.
   * If provided, the item is hidden from users who don't have at least one of these roles.
   */
  roles?: Role[]
  /** Statically disable the link (renders as non-clickable) */
  disabled?: boolean
  /** Nested child nav items — triggers collapsible group rendering */
  children?: NavItem[]
  /** Optional badge content (string or number) shown as a pill on the right */
  badge?: string | number
}

/** A named section grouping multiple NavItems with an optional heading */
export interface NavSection {
  /** Optional section heading label */
  title?: string
  items: NavItem[]
}
