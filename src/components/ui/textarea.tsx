import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex w-full cursor-text border bg-white font-medium text-gray-700 transition-colors disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'min-h-[60px] rounded-[8px] px-2.5 py-2.5 text-[13px] leading-4',
        base: 'min-h-[72px] rounded-[10px] p-3 text-sm leading-[18px]',
        md: 'min-h-[96px] rounded-[10px] p-3.5 text-base leading-5',
        lg: 'min-h-[120px] rounded-xl p-3.5 text-xl leading-6',
      },
      variant: {
        default:
          'border-gray-200 hover:border-blue-600 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10',
        error:
          'border-red-500 ring-2 ring-red-500/10 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10',
        success:
          'border-green-500 hover:border-green-500 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/10',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
  },
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      wrapperClassName,
      size,
      variant,
      error = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const finalVariant = error ? 'error' : variant;

    return (
      <div
        className={cn(
          textareaVariants({ size, variant: finalVariant }),
          disabled && 'cursor-not-allowed bg-gray-100 hover:border-gray-200',
          wrapperClassName,
        )}
      >
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            'h-full w-full resize-none border-none bg-transparent p-0 placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-40',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
