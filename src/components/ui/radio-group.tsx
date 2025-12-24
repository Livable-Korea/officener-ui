import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { type VariantProps, cva } from 'class-variance-authority';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const radioGroupItemVariants = cva(
  'aspect-square rounded-full border bg-white shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/10 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40',
  {
    variants: {
      size: {
        md: 'size-4',
        lg: 'size-5',
        xl: 'size-6',
      },
      variant: {
        default:
          'border-gray-300 hover:border-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600',
        error:
          'border-red-500 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

const indicatorSizeVariants = cva('fill-white stroke-none', {
  variants: {
    size: {
      md: 'size-2.5',
      lg: 'size-3',
      xl: 'size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
      'size'
    >,
    VariantProps<typeof radioGroupItemVariants> {
  error?: boolean;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, variant, error = false, ...props }, ref) => {
  const finalVariant = error ? 'error' : variant;

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        radioGroupItemVariants({ size, variant: finalVariant }),
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(indicatorSizeVariants({ size }))} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, radioGroupItemVariants };
