'use client';

import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

// CVA Variants
const toggleVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-200',
  {
    variants: {
      color: {
        blue: 'data-[state=checked]:bg-blue-600 focus-visible:ring-blue-500',
        green: 'data-[state=checked]:bg-green-500 focus-visible:ring-green-400',
        black: 'data-[state=checked]:bg-black focus-visible:ring-gray-300',
      },
      size: {
        '20': 'h-5 w-9',
        '24': 'h-6 w-11',
      },
    },
    defaultVariants: {
      color: 'blue',
      size: '24',
    },
  },
);

const toggleThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        '20': 'h-4 w-4 data-[state=checked]:translate-x-4',
        '24': 'h-5 w-5 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: {
      size: '24',
    },
  },
);

// Types
export interface ToggleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
      'size' | 'color'
    >,
    VariantProps<typeof toggleVariants> {}

// Component
const Toggle = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  ToggleProps
>(({ className, color, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(toggleVariants({ color, size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(toggleThumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));
Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants, toggleThumbVariants };
