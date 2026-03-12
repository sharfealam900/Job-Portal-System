import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#F83002] to-[#ff6a3d] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95",

        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg active:scale-95",

        outline:
          "border border-gray-300 bg-white hover:bg-gray-100 hover:shadow-sm",

        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300",

        ghost:
          "hover:bg-gray-100",

        link:
          "text-[#F83002] underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-5",
        xs: "h-7 px-3 text-xs",
        sm: "h-8 px-4",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
