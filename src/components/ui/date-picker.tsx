import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { add, format } from "date-fns";
import { ko } from "date-fns/locale";
import * as React from "react";
import type { DateRange, Formatters } from "react-day-picker";
import type { Locale } from "date-fns";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ArrowDown2, CloseCircle, SearchNormal1 } from "iconsax-react";

const datePickerVariants = {
  trigger: cva(
    "flex w-full cursor-pointer items-center justify-start gap-2 border text-left font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-gray-50 data-[state=open]:ring-2 data-[state=open]:ring-gray-600/10",
    {
      variants: {
        size: {
          sm: "h-9 rounded-lg px-3 text-[13px] leading-4",
          base: "h-10 rounded-lg px-3.5 text-sm leading-5",
          md: "h-12 rounded-[10px] px-4 text-base leading-5",
        },
        status: {
          default: "border-gray-300",
          error: "border-red-500 ring-red-500/20",
          disabled: "border-gray-200 bg-gray-100",
        },
      },
      defaultVariants: {
        size: "sm",
        status: "default",
      },
    }
  ),
  content: cva("flex w-auto flex-col overflow-hidden p-0", {
    variants: {
      size: {
        sm: "rounded-lg",
        base: "rounded-lg",
        md: "rounded-[10px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }),
  timePanel: cva(
    "flex flex-col items-center gap-3 overflow-y-auto overflow-x-hidden border-l border-gray-200 px-3 pb-4",
    {
      variants: {
        size: {
          sm: "h-[280px] w-[100px]",
          base: "h-[290px] w-[105px]",
          md: "h-[300px] w-[110px]",
        },
      },
      defaultVariants: {
        size: "sm",
      },
    }
  ),
  timeSlot: cva(
    "w-full cursor-pointer rounded-lg px-3 text-center font-normal text-gray-900 disabled:cursor-not-allowed disabled:opacity-50",
    {
      variants: {
        size: {
          sm: "h-8 text-[13px]",
          base: "h-9 text-sm",
          md: "h-9 text-base",
        },
        selected: {
          true: "bg-blue-400 text-white",
          false: "",
        },
      },
      defaultVariants: {
        size: "sm",
        selected: false,
      },
    }
  ),
};

type TimeType = "none" | "panel" | "input";

interface DatePickerBaseProps
  extends VariantProps<typeof datePickerVariants.trigger> {
  placeholder?: string;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
  timeType?: TimeType;
  formatString?: string;
  className?: string;
  showArrow?: boolean;
  bottomElement?: React.ReactNode;
  locale?: Locale;
  formatters?: Partial<Formatters>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  error?: boolean;
  children?: React.ReactNode;
}

interface DatePickerSingleProps extends DatePickerBaseProps {
  mode: "single";
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: "range";
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  onReset?: () => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

function DatePicker(props: DatePickerProps) {
  const {
    mode,
    placeholder = "날짜 선택",
    disabled = false,
    disabledDate,
    timeType = "none",
    formatString,
    className,
    showArrow = true,
    bottomElement,
    locale = ko,
    formatters,
    open,
    onOpenChange,
    error = false,
    size = "sm",
    children,
  } = props;

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const defaultFormatString = React.useMemo(() => {
    if (formatString) return formatString;
    if (timeType === "none") return "yyyy.MM.dd";
    return "yyyy.MM.dd HH:mm";
  }, [formatString, timeType]);

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      if (isOpen && mode === "single" && props.value && timeType === "panel") {
        requestAnimationFrame(() => {
          const hours = props.value?.getHours() ?? 0;
          const minutes = props.value?.getMinutes() ?? 0;
          const scrollTop = (hours * 6 + minutes / 10) * 36 - 72;
          scrollRef.current?.scrollTo({ top: scrollTop });
        });
      }

      if (!isOpen && mode === "range" && props.onReset) {
        props.onReset();
      }

      onOpenChange?.(isOpen);
    },
    [mode, props, timeType, onOpenChange]
  );

  if (mode === "single") {
    return (
      <SingleDatePicker
        {...props}
        placeholder={placeholder}
        disabled={disabled}
        disabledDate={disabledDate}
        timeType={timeType}
        formatString={defaultFormatString}
        className={className}
        showArrow={showArrow}
        bottomElement={bottomElement}
        locale={locale}
        formatters={formatters}
        open={open}
        onOpenChange={handleOpenChange}
        error={error}
        size={size}
        scrollRef={scrollRef}
        children={children}
      />
    );
  }

  return (
    <RangeDatePicker
      {...props}
      placeholder={placeholder}
      disabled={disabled}
      disabledDate={disabledDate}
      formatString={defaultFormatString}
      className={className}
      showArrow={showArrow}
      locale={locale}
      formatters={formatters}
      open={open}
      onOpenChange={handleOpenChange}
      error={error}
      size={size}
      children={children}
    />
  );
}

interface SingleDatePickerInternalProps extends DatePickerSingleProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

function SingleDatePicker({
  value,
  onChange,
  placeholder,
  disabled,
  disabledDate,
  timeType,
  formatString,
  className,
  showArrow,
  bottomElement,
  locale,
  formatters,
  open,
  onOpenChange,
  error,
  size,
  scrollRef,
  children,
}: SingleDatePickerInternalProps) {
  const handleSelect = React.useCallback(
    (newDay: Date | undefined) => {
      if (!newDay) return;
      if (!value) {
        onChange(newDay);
        return;
      }
      const diff = newDay.getTime() - value.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      const newDateFull = add(value, { days: Math.ceil(diffInDays) });
      onChange(newDateFull);
    },
    [value, onChange]
  );

  const handleTimeSelect = React.useCallback(
    (index: number) => {
      if (!value) return;
      const hours = Math.floor(index / 6);
      const minutes = (index % 6) * 10;
      const newDate = new Date(value);
      newDate.setHours(hours, minutes, 0, 0);
      onChange(newDate);
    },
    [value, onChange]
  );

  const isTimeSlotDisabled = React.useCallback(
    (index: number) => {
      if (!value) return false;
      const isToday = value.toDateString() === new Date().toDateString();
      if (!isToday) return false;

      const hours = Math.floor(index / 6);
      const minutes = (index % 6) * 10;
      const now = new Date();
      return (
        hours < now.getHours() ||
        (hours === now.getHours() && minutes < now.getMinutes())
      );
    },
    [value]
  );

  const isTimeSlotSelected = React.useCallback(
    (index: number) => {
      if (!value) return false;
      const hours = Math.floor(index / 6);
      const minutes = (index % 6) * 10;
      return value.getHours() === hours && value.getMinutes() === minutes;
    },
    [value]
  );

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className="group">
        {children ?? (
          <button
            type="button"
            disabled={disabled}
            className={cn(
              datePickerVariants.trigger({
                size,
                status: error ? "error" : disabled ? "disabled" : "default",
              }),
              !value && "text-gray-400",
              className
            )}
          >
            {value ? (
              format(value, formatString ?? "yyyy.MM.dd", { locale })
            ) : (
              <span>{placeholder}</span>
            )}
            {showArrow && (
              <ArrowDown2
                size={size === "sm" ? 16 : 20}
                variant="Outline"
                color="currentColor"
                className={cn(
                  "ml-auto text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
                )}
              />
            )}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className={cn(datePickerVariants.content({ size }))}>
        <div className="flex w-full">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={disabledDate}
            defaultMonth={value || new Date()}
            locale={locale}
            formatters={formatters}
            size={size}
          />
          {timeType === "panel" && (
            <div
              ref={scrollRef}
              className={cn(datePickerVariants.timePanel({ size }))}
            >
              <div className="sticky top-0 z-10 w-full items-center justify-center bg-white pt-4">
                <p className="h-6 items-center justify-center text-center text-sm font-medium">
                  시간
                </p>
              </div>
              <div className="flex flex-col">
                {Array.from({ length: 144 }, (_, i) => {
                  const hours = Math.floor(i / 6);
                  const minutes = (i % 6) * 10;
                  return (
                    <button
                      key={`time-slot-${i}`}
                      type="button"
                      disabled={isTimeSlotDisabled(i)}
                      className={cn(
                        datePickerVariants.timeSlot({
                          size,
                          selected: isTimeSlotSelected(i),
                        })
                      )}
                      onClick={() => handleTimeSelect(i)}
                    >
                      {hours.toString().padStart(2, "0")}:
                      {minutes === 0 ? "00" : minutes}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {bottomElement}
      </PopoverContent>
    </Popover>
  );
}

interface RangeDatePickerInternalProps
  extends Omit<DatePickerRangeProps, "timeType" | "bottomElement"> {}

function RangeDatePicker({
  value,
  onChange,
  placeholder,
  disabled,
  disabledDate,
  formatString,
  className,
  showArrow,
  locale,
  formatters,
  open,
  onOpenChange,
  error,
  size,
  children,
}: RangeDatePickerInternalProps) {
  const handleSelect = React.useCallback(
    (range: DateRange | undefined) => {
      if (!range) {
        onChange({ from: value?.from, to: undefined });
        return;
      }

      const isResetNeeded = !value?.from || (value?.from && value?.to);
      const hasFutureTo = range.to && value?.to && value.to < range.to;
      const isBetweenExistingRange =
        value?.from &&
        value?.to &&
        range.from &&
        value.from <= range.from &&
        value.to >= range.from;
      const isPartiallyOutside =
        range.to &&
        value?.from &&
        value?.to &&
        value.from < range.to &&
        value.to > range.to;

      if (isResetNeeded) {
        if (hasFutureTo) {
          onChange({ from: range.to, to: undefined });
          return;
        }

        if (isBetweenExistingRange) {
          onChange({
            from: isPartiallyOutside ? range.to : range.from,
            to: undefined,
          });
          return;
        }

        onChange({ from: range.from, to: undefined });
        return;
      }

      const isSecondClick = value?.from && !value?.to;

      if (isSecondClick && range.from && range.to) {
        const [from, to] =
          range.from < range.to
            ? [range.from, range.to]
            : [range.to, range.from];
        onChange({ from, to });
      }
    },
    [value, onChange]
  );

  const displayText = React.useMemo(() => {
    if (!value?.from && !value?.to) {
      return null;
    }
    const fromText = value?.from
      ? format(value.from, formatString ?? "yyyy.MM.dd", { locale })
      : `시작${placeholder}`;
    const toText = value?.to
      ? format(value.to, formatString ?? "yyyy.MM.dd", { locale })
      : `종료${placeholder}`;
    return `${fromText} - ${toText}`;
  }, [value, formatString, locale, placeholder]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className="group">
        {children ?? (
          <button
            type="button"
            disabled={disabled}
            className={cn(
              datePickerVariants.trigger({
                size,
                status: error ? "error" : disabled ? "disabled" : "default",
              }),
              !value?.from && !value?.to && "text-gray-400",
              className
            )}
          >
            {displayText || <span>{placeholder}</span>}
            {showArrow && (
              <ArrowDown2
                size={size === "sm" ? 16 : 20}
                variant="Outline"
                color="currentColor"
                className={cn(
                  "ml-auto text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
                )}
              />
            )}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className={cn(datePickerVariants.content({ size }))}>
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleSelect}
          disabled={disabledDate}
          defaultMonth={value?.from || new Date()}
          locale={locale}
          formatters={formatters}
          size={size}
        />
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker, datePickerVariants };
