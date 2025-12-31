import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

// ============================================
// HeadingRoot - Container component
// ============================================
export interface HeadingRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingRoot = React.forwardRef<HTMLDivElement, HeadingRootProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full flex-col gap-2 bg-white p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);
HeadingRoot.displayName = "HeadingRoot";

// ============================================
// HeadingBreadcrumb - Breadcrumb slot
// ============================================
export interface HeadingBreadcrumbProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingBreadcrumb = React.forwardRef<
  HTMLDivElement,
  HeadingBreadcrumbProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props}>
    {children}
  </div>
));
HeadingBreadcrumb.displayName = "HeadingBreadcrumb";

// ============================================
// HeadingBadges - Badge container
// ============================================
export interface HeadingBadgesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingBadges = React.forwardRef<HTMLDivElement, HeadingBadgesProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);
HeadingBadges.displayName = "HeadingBadges";

// ============================================
// HeadingContent - Main content area (title + right element)
// ============================================
export interface HeadingContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingContent = React.forwardRef<HTMLDivElement, HeadingContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  )
);
HeadingContent.displayName = "HeadingContent";

// ============================================
// HeadingTabs - Tab container for multiple headings
// ============================================
export interface HeadingTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingTabs = React.forwardRef<HTMLDivElement, HeadingTabsProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-6 text-2xl leading-9 font-semibold text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
HeadingTabs.displayName = "HeadingTabs";

// ============================================
// HeadingTab - Individual tab item with asChild
// ============================================
const headingTabVariants = cva(
  "text-2xl leading-9 font-semibold transition-colors",
  {
    variants: {
      state: {
        active: "font-bold text-gray-900",
        inactive: "text-gray-400 hover:text-gray-600",
        static: "cursor-default text-gray-900",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
);

export interface HeadingTabProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingTabVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

const HeadingTab = React.forwardRef<HTMLElement, HeadingTabProps>(
  ({ className, state, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(headingTabVariants({ state, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
HeadingTab.displayName = "HeadingTab";

// ============================================
// HeadingTitle - Simple title (non-tabbed)
// ============================================
export interface HeadingTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const HeadingTitle = React.forwardRef<HTMLHeadingElement, HeadingTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "text-2xl leading-9 font-semibold text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
);
HeadingTitle.displayName = "HeadingTitle";

// ============================================
// HeadingActions - Right side action area
// ============================================
export interface HeadingActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingActions = React.forwardRef<HTMLDivElement, HeadingActionsProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);
HeadingActions.displayName = "HeadingActions";

// ============================================
// HeadingBottom - Bottom element area
// ============================================
export interface HeadingBottomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const HeadingBottom = React.forwardRef<HTMLDivElement, HeadingBottomProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
);
HeadingBottom.displayName = "HeadingBottom";

// ============================================
// Compound Component
// ============================================
const Heading = {
  Root: HeadingRoot,
  Breadcrumb: HeadingBreadcrumb,
  Badges: HeadingBadges,
  Content: HeadingContent,
  Tabs: HeadingTabs,
  Tab: HeadingTab,
  Title: HeadingTitle,
  Actions: HeadingActions,
  Bottom: HeadingBottom,
};

// ============================================
// Exports
// ============================================
export {
  Heading,
  HeadingRoot,
  HeadingBreadcrumb,
  HeadingBadges,
  HeadingContent,
  HeadingTabs,
  HeadingTab,
  HeadingTitle,
  HeadingActions,
  HeadingBottom,
  headingTabVariants,
};
