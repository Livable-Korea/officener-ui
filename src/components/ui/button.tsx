import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white',
        secondaryBlue:
          'bg-white hover:bg-blue-50 active:bg-blue-100 text-blue-600 border border-blue-600',
        secondaryGray:
          'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-500 border border-gray-300 box-border',
        secondaryRed:
          'bg-white hover:bg-red-50 active:bg-red-100 text-red-500 border border-red-500',
        neutral:
          'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-500',
        accent: 'bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-600',
        warning: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white',
        error: 'bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-500',
        ghostBlue: 'hover:bg-blue-50 active:bg-blue-100 text-blue-600',
        ghostGray:
          'hover:bg-gray-50 active:bg-gray-100 border border-transparent active:border-gray-200 text-gray-700',
        ghostRed:
          'hover:bg-red-50 active:bg-red-100 hover:text-red-600 active:text-red-700 text-red-500',
        green:
          'border-[#4D9D76] bg-[rgba(77,157,118,0.02)] text-[#00733B] hover:bg-[rgba(77,157,118,0.06)] active:bg-[rgba(77,157,118,0.10)] border box-border',
      },
      size: {
        sm: 'gap-0.5 h-9 rounded-lg p-2.5 text-[13px] font-medium leading-4',
        base: 'gap-1 rounded-[10px] p-3 text-sm font-medium leading-[18px]',
        md: 'gap-1 rounded-[10px] p-3.5 text-base font-medium leading-5',
        lg: 'gap-2 rounded-xl p-3.5 text-xl font-semibold leading-6',
        icon: 'h-9 w-9 rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const spinnerSizeMap = {
  sm: 'size-4',
  base: 'size-[18px]',
  md: 'size-5',
  lg: 'size-6',
  icon: 'size-4',
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2
            className={cn(
              spinnerSizeMap[size ?? 'md'],
              variant === 'primary' || variant === 'warning'
                ? 'text-white'
                : 'text-gray-400',
              'animate-spin',
            )}
          />
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
