'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

// CVA Variants
const paginationItemVariants = cva(
  'flex h-9 w-9 cursor-pointer items-center justify-center text-[13px] font-semibold leading-[1.2] text-gray-500 transition-colors',
  {
    variants: {
      variant: {
        default: 'rounded-lg',
        circle: 'rounded-full',
      },
      state: {
        default: 'bg-white hover:border hover:border-gray-200 hover:bg-gray-50',
        active: 'border border-blue-100 bg-blue-50 text-blue-600',
        disabled: 'cursor-not-allowed opacity-30',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
    },
  },
);

// Types
export interface PaginationProps extends React.ComponentProps<'nav'> {}

export interface PaginationContentProps extends React.ComponentProps<'ul'> {}

export interface PaginationItemProps extends React.ComponentProps<'li'> {}

export interface PaginationLinkProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
  asChild?: boolean;
}

export interface PaginationControlProps
  extends React.ComponentProps<'button'>,
    Omit<VariantProps<typeof paginationItemVariants>, 'state'> {
  asChild?: boolean;
}

export interface PaginationEllipsisProps
  extends React.ComponentProps<'span'>,
    Omit<VariantProps<typeof paginationItemVariants>, 'state'> {}

// Components
const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-end', className)}
      {...props}
    />
  ),
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  (
    { className, isActive, variant, asChild = false, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        aria-current={isActive ? 'page' : undefined}
        disabled={disabled}
        className={cn(
          paginationItemVariants({
            variant,
            state: disabled ? 'disabled' : isActive ? 'active' : 'default',
          }),
          className,
        )}
        {...props}
      />
    );
  },
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationControlProps
>(({ className, variant, disabled, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      aria-label="이전 페이지"
      disabled={disabled}
      className={cn(
        paginationItemVariants({
          variant,
          state: disabled ? 'disabled' : 'default',
        }),
        className,
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Comp>
  );
});
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationControlProps
>(({ className, variant, disabled, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      aria-label="다음 페이지"
      disabled={disabled}
      className={cn(
        paginationItemVariants({
          variant,
          state: disabled ? 'disabled' : 'default',
        }),
        className,
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </Comp>
  );
});
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, variant, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn(
      paginationItemVariants({ variant, state: 'default' }),
      'cursor-default hover:border-transparent hover:bg-white',
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = 'PaginationEllipsis';

// High-level Component Types
export interface PaginationComponentProps {
  /** 전체 아이템 수 */
  totalCount: number;
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 페이지당 아이템 수 (기본값: 10) */
  pageSize?: number;
  /** 표시할 페이지 버튼 수 (기본값: 5) */
  pageRange?: number;
  /** 스타일 variant */
  variant?: 'default' | 'circle';
  /** 총 결과 수 텍스트 표시 여부 */
  showTotalText?: boolean;
  /** 추가 className */
  className?: string;
}

// High-level Component
const PaginationComponent = ({
  totalCount,
  currentPage,
  onPageChange,
  pageSize = 10,
  pageRange = 5,
  variant = 'default',
  showTotalText = false,
  className,
}: PaginationComponentProps) => {
  const totalPage = Math.ceil(totalCount / pageSize);
  const rangeStart = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  const pageCount =
    rangeStart + pageRange <= totalPage
      ? pageRange
      : Math.max(0, totalPage - rangeStart + 1);

  if (totalPage === 0) return null;

  return (
    <Pagination className={className}>
      <div className="flex items-center gap-3">
        {showTotalText && (
          <p className="text-base font-normal text-gray-500">
            {`총 ${totalCount}개의 결과`}
          </p>
        )}
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              variant={variant}
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, index) => {
            const page = rangeStart + index;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  variant={variant}
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              variant={variant}
              disabled={currentPage >= totalPage}
              onClick={() => onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </div>
    </Pagination>
  );
};
PaginationComponent.displayName = 'PaginationComponent';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationComponent,
  paginationItemVariants,
};
