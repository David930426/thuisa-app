/**
 * Card surface for items inside <Shelf>: large radius, soft shadow that
 * deepens on hover.
 *
 * This lives outside shelf.tsx on purpose. shelf.tsx is a "use client" module,
 * and a plain value exported from one arrives in a server component as a
 * client reference, not a string, so cn() would silently drop it.
 */
export const shelfCardClass =
  "group gap-0 overflow-hidden rounded-[18px] border-0 bg-white py-0 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[2px_4px_16px_rgba(0,0,0,0.16)]";
