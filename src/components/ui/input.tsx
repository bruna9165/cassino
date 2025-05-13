import { cn } from '@/lib/utils'
import { type ComponentProps, type ReactNode, forwardRef } from 'react'
import { Label } from './Label'
 
export interface InputProps extends ComponentProps<'input'> {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  label?: string
  required?: boolean
}
 
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      iconLeft,
      iconRight,
      label,
      id,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-red-500">{' *'}</span>}
          </Label>
        )}
 
        <div className="relative w-full">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {iconLeft}
            </span>
          )}
 
          <input
            type={type}
            id={id}
            className={cn(
              `flex h-12 font-sans w-full rounded-md bg-[#1D1F2C] px-4 py-2 font-medium text-base shadow-sm transition-colors 
              file:py-2 file:px-4 lg:file:px-7 file:cursor-pointer file:rounded-md file:mr-2 file:bg-primary file:h-full file:text-sm file:font-medium text-slate-300 placeholder:text-slate-500
              focus:ring-gray-400 pr-10 focus:outline-none focus:ring-2
              disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:border-gray-00 
              md:text-sm
              border border-solid border-gray-500`,
              className,
              iconLeft && 'pl-10',
              {
                'border-none shadow-inherit px-0 shadow-none h-auto text-sm lg:text-base':
                  type === 'file',
              }
            )}
            ref={ref}
            {...props}
          />
 
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {iconRight}
            </span>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input";
 
export { Input };