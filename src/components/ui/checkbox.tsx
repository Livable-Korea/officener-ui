import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import * as React from 'react';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  error?: boolean;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, error, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-5 shrink-0 rounded-[5px] border border-gray-300 bg-white',
      'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600',
      'data-[state=checked]:hover:bg-blue-700 data-[state=checked]:hover:border-blue-700',
      'data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600',
      'data-[state=indeterminate]:hover:bg-blue-700 data-[state=indeterminate]:hover:border-blue-700',
      'hover:border-blue-600',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/10 focus-visible:ring-offset-0',
      'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-300',
      error && 'border-red-500',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
      <Check className="size-4 hidden [[data-state=checked]_&]:block" />
      <Minus className="size-4 hidden [[data-state=indeterminate]_&]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
