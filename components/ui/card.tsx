import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import * as Slot from "@radix-ui/react-slot"

/*
 * Card variants. Each one is a complete class list, so call sites only add
 * size, padding and grid placement, never undo a variant's classes:
 * tailwind-merge doesn't know this project's token classes (rounded-shelf,
 * shadow-shelf, ...), so overriding those through className is unreliable.
 *
 *   default      shadcn card: border, small shadow, vertical padding, gap-6.
 *                Used for plain bordered cards.
 *   interactive  shelf card that is a link: no border, no padding, lifts
 *                (scale 1.01) and deepens its shadow on hover. Carries
 *                `group` for group-hover effects inside.
 *   tile         the same surface without the hover scale, for cards that
 *                aren't links (About mission/vision, Contact and home tiles).
 *   muted        a tile on the ink-50 surface (Contact form, home
 *                Membership tile).
 *
 * The radius and shadows reproduce what the site rendered when these
 * variants were introduced, which is not what the shelf classes intended:
 * since the token rename, cn() kept the base card's rounded-xl and shadow-sm
 * next to rounded-shelf and shadow-shelf, and those won. So shelf cards show
 * a 16px radius and shadow-sm (not 18px and shadow-shelf), and the muted
 * cards show shadow-shelf where shadow-none was meant. Moving to
 * rounded-shelf/shadow-shelf (and shadow-none for muted) is a visible change
 * awaiting sign-off; it only needs the strings below.
 */
const cardVariants = cva("", {
  variants: {
    variant: {
      default:
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
      interactive:
        "group flex flex-col gap-0 overflow-hidden rounded-xl bg-surface text-card-foreground shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-shelf-hover",
      tile:
        "flex flex-col gap-0 overflow-hidden rounded-xl bg-surface text-card-foreground shadow-sm transition-all duration-300 hover:shadow-shelf-hover",
      muted:
        "flex flex-col gap-0 overflow-hidden rounded-xl bg-surface-muted text-card-foreground shadow-shelf transition-all duration-300 hover:shadow-shelf-hover",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Card({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & { asChild?: boolean }) {
  // asChild lets a card render as the <a>/<Link>/<article> it wraps, instead
  // of nesting an interactive element inside a plain div.
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  // asChild lets a card title render as a real heading (h2/h3/...) so the
  // page keeps a correct document outline.
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
