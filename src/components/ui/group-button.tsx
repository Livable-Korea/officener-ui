import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const groupButtonItemVariants = cva(
  'flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-700/40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:bg-transparent',
  {
    variants: {
      variant: {
        default: 'py-2 px-4',
        icon: 'p-2 size-9',
        leadingIcon: 'py-2 pr-4 pl-3',
        trailingIcon: 'py-2 pr-2.5 pl-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface GroupButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GroupButton = React.forwardRef<HTMLDivElement, GroupButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GroupButton.displayName = 'GroupButton';

export interface GroupButtonItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof groupButtonItemVariants> {
  children: React.ReactNode;
}

const GroupButtonItem = React.forwardRef<
  HTMLButtonElement,
  GroupButtonItemProps
>(({ variant, className, children, ...props }, ref) => {
  return (
    <button
      type="button"
      className={cn(groupButtonItemVariants({ variant }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
GroupButtonItem.displayName = 'GroupButtonItem';

export { GroupButton, GroupButtonItem, groupButtonItemVariants };
