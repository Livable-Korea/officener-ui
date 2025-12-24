import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import type * as React from 'react';

const badgeVariants = cva(
  'inline-flex justify-center w-fit py-0.5 items-center font-medium',
  {
    variants: {
      variant: {
        basic: 'rounded-[10px]',
        rounded: 'rounded-[4px]',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 text-sm',
      },
      theme: {
        gray: 'bg-gray-100 text-gray-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        green: 'bg-green-100 text-green-800',
        blue: 'bg-blue-100 text-blue-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        purple: 'bg-purple-100 text-purple-800',
        pink: 'bg-pink-100 text-pink-800',
        orange: 'bg-orange-100 text-orange-800',
        lime: 'bg-lime-100 text-lime-800',
      },
    },
    defaultVariants: {
      variant: 'basic',
      size: 'sm',
      theme: 'gray',
    },
  },
);

const dotVariants = cva('h-1.5 w-1.5 rounded-full mr-1.5', {
  variants: {
    theme: {
      gray: 'bg-gray-400',
      red: 'bg-red-400',
      yellow: 'bg-yellow-400',
      green: 'bg-green-400',
      blue: 'bg-blue-400',
      indigo: 'bg-indigo-400',
      purple: 'bg-purple-400',
      pink: 'bg-pink-400',
      orange: 'bg-orange-400',
      lime: 'bg-lime-400',
    },
  },
  defaultVariants: {
    theme: 'gray',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  removeButton?: boolean;
  onRemove?: () => void;
}

function Badge({
  className,
  variant,
  size,
  theme,
  children,
  dot,
  removeButton,
  onRemove,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size, theme }),
        (dot || removeButton) && 'px-2',
        className,
      )}
      {...props}
    >
      {dot && <div className={cn(dotVariants({ theme }))} />}
      {children}
      {removeButton && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 -mr-0.5 hover:opacity-70 focus:outline-none"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
