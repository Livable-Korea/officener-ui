import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 text-white',
        secondaryBlue: 'bg-white hover:bg-blue-50 active:bg-blue-100 disabled:opacity-40 text-blue-600 font-medium border border-blue-600',
        secondaryGray:
          'bg-white hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 text-gray-500 font-medium border border-gray-300 box-border',
        secondaryRed: 'bg-white hover:bg-red-50 active:bg-red-100 disabled:opacity-40 text-red-500 font-medium border border-red-500',
        neutral: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 text-gray-500 font-medium',
        accent: 'bg-blue-50 hover:bg-blue-100 active:bg-blue-200 disabled:opacity-40 text-blue-600 font-medium',
        warning: 'bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:opacity-40 text-white font-medium',
        error: 'bg-red-50 hover:bg-red-100 active:bg-red-200 disabled:opacity-40 text-red-500 font-medium',
        ghostBlue: 'hover:bg-blue-50 active:bg-blue-100 disabled:opacity-40 text-blue-600 font-medium',
        ghostGray:
          'hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 border border-transparent active:border-gray-200 text-gray-700 font-medium',
        ghostRed: 'hover:bg-red-50 active:bg-red-100 hover:text-red-600 active:text-red-700 disabled:opacity-40 text-red-500 font-medium',
        green:
          'border-[#4D9D76] bg-[rgba(77,157,118,0.02)] text-[#00733B] hover:bg-[rgba(77,157,118,0.06)] active:bg-[rgba(77,157,118,0.10)] disabled:opacity-40 font-medium border box-border',
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
