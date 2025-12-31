"use client";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import * as React from "react";
import {
  type DayButtonProps as RDPDayButtonProps,
  type DayPickerProps,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";
import { Button, buttonVariants } from "./button";
import { Dropdown } from "./dropdown";

const calendarVariants = {
  root: cva("w-fit rounded-lg bg-background text-gray-800", {
    variants: {
      size: {
        sm: "w-[280px] px-5 py-3",
        base: "w-[290px] px-5 py-3.5",
        md: "w-[300px] px-6 py-4",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }),
  dayButton: cva(
    "flex size-9 flex-col items-center justify-center gap-1 rounded-full font-normal leading-none text-gray-800",
    {
      variants: {
        variant: {
          default: "hover:bg-gray-50 active:bg-gray-100",
          selected: "bg-blue-500 text-white",
          rangeStart: "rounded-r-none bg-blue-500 text-white",
          rangeEnd: "rounded-l-none bg-blue-500 text-white",
          rangeMiddle: "rounded-none bg-blue-50 text-gray-800",
          outside: "text-gray-200",
          disabled: "cursor-not-allowed opacity-50",
          today: "bg-gray-100",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  ),
};

export type CalendarProps = DayPickerProps &
  VariantProps<typeof calendarVariants.root>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  size = "sm",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const currentYear = new Date().getFullYear();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      endMonth={new Date(currentYear + 10, 11)}
      className={cn(
        calendarVariants.root({ size }),
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => format(date, "MM", { locale: ko }),
        formatWeekdayName: (weekday) => format(weekday, "eee", { locale: ko }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          "flex items-center justify-center flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 h-9 w-full absolute top-0 inset-x-0 justify-between z-0",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: "ghostGray" }),
          "aria-disabled:opacity-50 p-2.5 select-none rounded-full",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: "ghostGray" }),
          "aria-disabled:opacity-50 p-2.5 select-none rounded-full",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-9 w-full",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          defaultClassNames.dropdowns,
          "w-full flex items-center text-sm font-medium justify-center h-9 gap-1.5 relative z-10"
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring w-[72px] flex items-center border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-lg px-3 pr-2 z-10",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          captionLayout === "label"
            ? "text-sm"
            : "flex grow items-center justify-between gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-gray-500 size-9 flex items-center justify-center font-normal text-sm select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative size-9 p-0 text-center group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-full bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-full bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-full data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-gray-200 aria-selected:text-white",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(rootClassName)}
            {...rootProps}
          />
        ),
        Chevron: ({
          className: chevronClassName,
          orientation,
          ...chevronProps
        }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("size-4 text-gray-500", chevronClassName)}
                {...chevronProps}
              />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4 text-gray-500", chevronClassName)}
                {...chevronProps}
              />
            );
          }
          return (
            <ChevronDownIcon
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className="size-(--cell-size) flex items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        Dropdown: (dropdownProps) => {
          const { options, value, onChange } = dropdownProps;
          const dropdownData = options
            ? options.map((item) => ({
                value: String(item.value),
                label: item.label,
              }))
            : [];

          return (
            <Dropdown
              value={value !== undefined ? String(value) : ""}
              setValue={(newValue: string) => {
                if (!onChange) return;
                const numValue = Number(newValue);
                const eventValue = !Number.isNaN(numValue)
                  ? numValue
                  : newValue;
                const syntheticEvent = {
                  target: { value: eventValue },
                  currentTarget: { value: eventValue },
                } as unknown as React.ChangeEvent<HTMLSelectElement>;
                onChange(syntheticEvent);
              }}
              data={dropdownData}
              placeholder="선택"
              size="sm"
              isSearch={true}
              align="start"
              className="z-10 flex w-[72px] items-center justify-between gap-1 rounded-lg py-2 pl-3 pr-2 text-[13px] leading-4 text-gray-700"
              widthClassName="w-40"
              iconClassName="size-3 opacity-100 text-gray-500"
            />
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

export interface CalendarDayButtonProps extends RDPDayButtonProps {}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: CalendarDayButtonProps) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghostGray"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex size-9 flex-col gap-1 rounded-full font-normal leading-none text-gray-800",
        "data-[range-middle=true]:rounded-none data-[range-end=true]:rounded-l-none data-[range-start=true]:rounded-r-none",
        "data-[range-end=true]:bg-blue-500 data-[range-middle=true]:bg-blue-50 data-[range-start=true]:bg-blue-500 data-[selected-single=true]:bg-blue-500",
        "data-[range-end=true]:text-white data-[range-middle=true]:text-gray-800 data-[range-start=true]:text-white data-[selected-single=true]:text-white",
        modifiers.outside &&
          !modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle &&
          "text-gray-200",
        modifiers.outside && modifiers.range_selected && "bg-blue-100",
        modifiers.disabled && "opacity-50",
        defaultClassNames.day,
        className,
        modifiers.range_start && modifiers.range_end && "!rounded-full"
      )}
      {...props}
    />
  );
}
CalendarDayButton.displayName = "CalendarDayButton";
Calendar.displayName = "Calendar";

export { Calendar, CalendarDayButton, calendarVariants };
