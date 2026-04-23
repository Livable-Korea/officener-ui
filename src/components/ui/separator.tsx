import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const separatorVariants = cva('shrink-0 bg-gray-200', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface SeparatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => {
    const semanticProps = decorative
      ? { role: 'none' as const }
      : {
          role: 'separator' as const,
          'aria-orientation': orientation ?? 'horizontal',
        };

    return (
      <div
        ref={ref}
        className={cn(separatorVariants({ orientation }), className)}
        {...semanticProps}
        {...props}
      />
    );
  },
);
Separator.displayName = 'Separator';

export { Separator, separatorVariants };
