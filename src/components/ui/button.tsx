import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  ' w-full items-center border-none cursor-pointer justify-center rounded-md text-lg text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default:
          'bg-yellow-500 text-primary-foreground shadow hover:bg-yellow-600',
        destructive:
          'bg-background border-border border-yellow-500 text-white shadow-sm',
        outline:
          ' bg-[#1D1F2C] shadow-sm hover:bg-accent outline outline-yellow-500 outline-[1px] hover:text-accent-foreground',
        outlineSecondary:
          '  shadow-sm text-primary hover:bg-primary/10 hover:text-primary',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 text-black text-base font-semibold px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <>
        {loading ? (
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            disabled
            ref={ref}
            {...props}
          >
            <Loader2 className="animate-spin" />
          </Comp>
        ) : (
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        )}
      </>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }