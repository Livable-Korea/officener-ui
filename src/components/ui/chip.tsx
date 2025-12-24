import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const chipVariants = cva(
  'inline-flex w-fit items-center justify-center gap-1 rounded-full border text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      size: {
        sm: 'h-6 px-2',
        md: 'h-8 px-3',
      },
      theme: {
        default: 'border-gray-300 bg-white text-gray-700',
        orange: 'border-orange-300 bg-orange-50 text-orange-500',
        indigo: 'border-indigo-300 bg-indigo-50 text-indigo-500',
        blue: 'border-blue-300 bg-blue-50 text-blue-500',
        green: 'border-green-300 bg-green-50 text-green-500',
      },
      dashed: {
        true: 'border-dashed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'sm',
      theme: 'default',
      dashed: false,
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      size,
      theme,
      dashed,
      asChild = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          chipVariants({ size, theme, dashed, className }),
          disabled && 'pointer-events-none opacity-40',
        )}
        aria-disabled={disabled}
        {...props}
      />
    );
  },
);
Chip.displayName = 'Chip';

export { Chip, chipVariants };
