/**
 * Card surface for items inside <Shelf>: large radius, soft shadow that
 * deepens on hover.
 *
 * This lives outside shelf.tsx on purpose. shelf.tsx is a "use client" module,
 * and a plain value exported from one arrives in a server component as a
 * client reference, not a string, so cn() would silently drop it.
 */
export const shelfCardClass =
  "group gap-0 overflow-hidden rounded-shelf border-0 bg-surface py-0 shadow-shelf transition-all duration-300 hover:scale-[1.01] hover:shadow-shelf-hover";
