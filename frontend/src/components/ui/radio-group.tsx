import * as React from "react"
import { CircleIcon } from "lucide-react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-1", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        `
        relative
        size-5
        shrink-0
        rounded-full
        border-2
        border-gray-300
        bg-white
        transition-all
        duration-300
        hover:border-primary
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary/30
        data-[state=checked]:border-primary
        `,
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <CircleIcon className="size-2.5 fill-black" />
      </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }