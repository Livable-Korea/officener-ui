import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

// CVA Variants
const tabsListVariants = cva("inline-flex h-auto w-full items-center", {
  variants: {
    variant: {
      underline: "gap-6 border-b border-gray-200",
      pill: "gap-1 p-1 rounded-lg bg-gray-100",
      bar: "gap-0 border-b border-gray-200",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

const tabsTriggerVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 text-gray-500 data-[state=active]:text-gray-700 hover:text-gray-700",
  {
    variants: {
      variant: {
        underline:
          "border-b-2 border-transparent pb-4 px-1 data-[state=active]:border-gray-700",
        pill: "rounded-md px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm",
        bar: "border-b-2 border-transparent pb-4 px-4 data-[state=active]:border-gray-700",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "underline",
      fullWidth: false,
    },
  }
);

const tabsVariants = {
  list: tabsListVariants,
  trigger: tabsTriggerVariants,
};

// Base Components
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex h-auto items-center", className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-gray-500 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-gray-700",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Types
export interface TabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TabsComponentProps
  extends VariantProps<typeof tabsListVariants> {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  listClassName?: string;
  fullWidth?: boolean;
}

// High-level Component
const TabsComponent = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  variant = "underline",
  fullWidth = false,
  listClassName,
}: TabsComponentProps) => {
  return (
    <Tabs
      defaultValue={defaultValue || tabs[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList className={cn(tabsListVariants({ variant }), listClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={tabsTriggerVariants({ variant, fullWidth })}
          >
            {tab.icon}
            {tab.label}
            {tab.badge}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) =>
        tab.content ? (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ) : null
      )}
    </Tabs>
  );
};

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsComponent,
  tabsVariants,
  tabsListVariants,
  tabsTriggerVariants,
};
