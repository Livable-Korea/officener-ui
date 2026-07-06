import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { format } from 'date-fns';
import type { Locale } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ArrowDown2, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const MONTH_LABELS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const monthPickerVariants = {
  trigger: cva(
    'group flex w-full cursor-pointer items-center justify-start gap-2 border text-left font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-gray-50 data-[state=open]:ring-2 data-[state=open]:ring-gray-600/10',
    {
      variants: {
        size: {
          sm: 'h-9 rounded-lg px-3 text-[13px] leading-4',
          base: 'h-10 rounded-lg px-3.5 text-sm leading-5',
          md: 'h-12 rounded-[10px] px-4 text-base leading-5',
        },
        status: {
          default: 'border-gray-300',
          error: 'border-red-500 ring-red-500/20',
          disabled: 'border-gray-200 bg-gray-100',
        },
      },
      defaultVariants: {
        size: 'sm',
        status: 'default',
      },
    },
  ),
};

interface MonthPickerProps {
  /** 선택된 월(해당 월의 임의 일자). 미선택 시 undefined */
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  /** 이전(`‹`) 클릭 시 — 이동된 월(1일, year 모드는 이동된 연도 1월 1일) Date 전달. 기본 동작 후 호출. */
  onPrev?: (date: Date) => void;
  /** 다음(`›`) 클릭 시 — 이동된 월(1일, year 모드는 이동된 연도 1월 1일) Date 전달. 기본 동작 후 호출. */
  onNext?: (date: Date) => void;
  size?: 'sm' | 'base' | 'md' | null;
  status?: 'default' | 'error' | 'disabled' | null;
  placeholder?: string;
  disabled?: boolean;
  /** 비활성 월 판단 (해당 월 1일 기준 Date 전달) */
  disabledMonth?: (date: Date) => boolean;
  /** 화살표 이동 가능 연도 범위 시작/끝 (기본: 현재연도-10 ~ 현재연도+1) */
  fromYear?: number;
  toYear?: number;
  /** 헤더 좌우 화살표 이동 단위. 'month'(기본): 한 달 이동 + 즉시 onChange 커밋. 'year': 그리드 연도만 변경(onChange 커밋 없음) */
  navigationUnit?: 'month' | 'year';
  /** 트리거 표시 포맷 (date-fns). 기본 'yyyy.MM' */
  formatString?: string;
  className?: string;
  showArrow?: boolean;
  locale?: Locale;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  error?: boolean;
  children?: React.ReactNode;
}

/**
 * 월 선택 picker — 디자인 시스템 Figma 스펙(좌우 월 이동 + 연.월 라벨 + 12개월 그리드).
 * value/onChange controlled. 값은 해당 월 1일 기준 Date.
 */
function MonthPicker({
  value,
  onChange,
  onPrev,
  onNext,
  size = 'sm',
  status = 'default',
  placeholder = '월 선택',
  disabled = false,
  disabledMonth,
  fromYear,
  toYear,
  navigationUnit = 'month',
  formatString = 'yyyy.MM',
  className,
  showArrow = true,
  locale = ko,
  open,
  onOpenChange,
  error = false,
  children,
}: MonthPickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const currentYear = new Date().getFullYear();
  const minYear = fromYear ?? currentYear - 10;
  const maxYear = toYear ?? currentYear + 1;

  const [year, setYear] = React.useState(
    () => value?.getFullYear() ?? currentYear,
  );

  // 팝오버를 다시 열 때 선택값(미선택 시 현재 연도) 기준으로 동기화하고 fromYear/toYear로 클램프
  React.useEffect(() => {
    if (!isOpen) return;
    const targetYear = value?.getFullYear() ?? currentYear;
    setYear(Math.min(Math.max(targetYear, minYear), maxYear));
  }, [isOpen, value, currentYear, minYear, maxYear]);

  const resolvedStatus = error ? 'error' : disabled ? 'disabled' : status;

  const selectedOnThisYear =
    value !== undefined && value.getFullYear() === year;
  const displayMonth = selectedOnThisYear
    ? (value as Date).getMonth()
    : new Date().getMonth();

  const selectMonth = (month: number, close: boolean) => {
    onChange(new Date(year, month, 1));
    if (close) handleOpenChange(false);
  };

  const isYearUnit = navigationUnit === 'year';

  // 좌우 화살표 = 선택 월 ±1개월(연도 경계 자동 이동). 선택값 없으면 현재 월 기준.
  const baseDate = value ?? new Date(currentYear, new Date().getMonth(), 1);
  const prevDate = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1);
  const nextDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
  const prevDisabled = isYearUnit
    ? year - 1 < minYear
    : prevDate.getFullYear() < minYear || (disabledMonth?.(prevDate) ?? false);
  const nextDisabled = isYearUnit
    ? year + 1 > maxYear
    : nextDate.getFullYear() > maxYear || (disabledMonth?.(nextDate) ?? false);

  const stepMonth = (target: Date, notify?: (date: Date) => void) => {
    onChange(target);
    setYear(target.getFullYear());
    notify?.(target);
  };

  // 연도 단위 이동은 그리드 표시 연도만 바꾸고 선택값(onChange)은 건드리지 않는다
  const stepYear = (offset: 1 | -1, notify?: (date: Date) => void) => {
    const nextYear = year + offset;
    setYear(nextYear);
    notify?.(new Date(nextYear, 0, 1));
  };

  const handlePrev = () =>
    isYearUnit ? stepYear(-1, onPrev) : stepMonth(prevDate, onPrev);
  const handleNext = () =>
    isYearUnit ? stepYear(1, onNext) : stepMonth(nextDate, onNext);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {children ?? (
          <button
            type="button"
            disabled={disabled}
            className={cn(
              monthPickerVariants.trigger({ size, status: resolvedStatus }),
              !value && 'text-gray-400',
              className,
            )}
          >
            {value ? (
              format(value, formatString, { locale })
            ) : (
              <span>{placeholder}</span>
            )}
            {showArrow && (
              <ArrowDown2
                size={size === 'sm' ? 16 : 20}
                variant="Outline"
                color="currentColor"
                className="ml-auto text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            )}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col gap-3 rounded-lg border border-gray-300 px-6 py-4">
        {/* 헤더: 좌우 월 이동 + 연.월 라벨 */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label={isYearUnit ? '이전 연도' : '이전 달'}
            disabled={prevDisabled}
            onClick={handlePrev}
            className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft2 size={16} color="#6b7280" variant="Outline" />
          </button>
          {/* 헤더 중앙: 현재 연.월 표시 라벨 (Figma "2025. 7") — 연도 이동 모드는 연도만 */}
          <div className="flex items-center rounded px-2 py-0.5">
            <span className="text-base font-bold leading-6 text-gray-900">
              {isYearUnit ? `${year}년` : `${year}. ${displayMonth + 1}`}
            </span>
          </div>
          <button
            type="button"
            aria-label={isYearUnit ? '다음 연도' : '다음 달'}
            disabled={nextDisabled}
            onClick={handleNext}
            className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight2 size={16} color="#6b7280" variant="Outline" />
          </button>
        </div>

        {/* 12개월 그리드 (테두리 테이블) */}
        <table className="border-collapse">
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={MONTH_LABELS[row * 4]}>
                {MONTH_LABELS.slice(row * 4, row * 4 + 4).map((label, col) => {
                  const month = row * 4 + col;
                  const isDisabled =
                    disabledMonth?.(new Date(year, month, 1)) ?? false;
                  const isSelected =
                    selectedOnThisYear && displayMonth === month;
                  return (
                    <td key={label} className="border border-gray-200 p-0">
                      <button
                        type="button"
                        disabled={isDisabled}
                        aria-pressed={isSelected}
                        onClick={() => selectMonth(month, true)}
                        className={cn(
                          'flex h-[60px] w-[68px] items-center justify-center text-sm font-medium disabled:cursor-not-allowed disabled:opacity-30',
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-500 hover:bg-gray-100',
                        )}
                      >
                        {label}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </PopoverContent>
    </Popover>
  );
}

MonthPicker.displayName = 'MonthPicker';

export { MonthPicker, monthPickerVariants };
export type { MonthPickerProps };
