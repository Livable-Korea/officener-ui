import * as React from 'react';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { ArrowDown2, SearchNormal1, CloseCircle } from 'iconsax-react';
import { cva } from 'class-variance-authority';
import type { PopoverContentProps } from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// CVA variants
const dropdownVariants = {
  trigger: cva(
    'text-gray-500 data-[state=open]:bg-gray-50 data-[state=open]:ring-2 data-[state=open]:ring-gray-600/10',
    {
      variants: {
        size: {
          sm: 'h-9 rounded-lg px-3 text-[13px] leading-4 py-2 w-[168px]',
          base: 'h-10 rounded-lg px-3.5 text-sm leading-5 py-2.5 w-[184px]',
          md: 'h-12 rounded-[10px] px-4 text-base leading-5 py-3 w-[200px]',
        },
        status: {
          default: '',
          error: 'border-red-500 ring-red-500/20',
          disabled: 'opacity-50 cursor-not-allowed bg-gray-100',
        },
      },
      defaultVariants: {
        size: 'sm',
        status: 'default',
      },
    }
  ),
  item: cva('text-sm leading-4 text-gray-500', {
    variants: {
      size: {
        sm: 'h-9 text-[13px] leading-4 px-2.5 py-3.5',
        base: 'h-10 text-sm leading-5 px-3 py-3',
        md: 'h-12 text-base leading-5 px-4 py-3.5',
      },
    },
  }),
  input: cva('h-9 text-[13px] leading-4', {
    variants: {
      size: {
        sm: 'h-9 text-[13px] leading-4',
        base: 'h-10 text-sm leading-5',
        md: 'h-12 text-base leading-5',
      },
    },
  }),
  content: cva('border border-gray-300 bg-popover p-0 shadow-md', {
    variants: {
      size: {
        sm: 'w-[168px] rounded-lg',
        base: 'w-[184px] rounded-lg',
        md: 'w-[200px] rounded-[10px]',
      },
      status: {
        default: '',
        error: 'border-red-500',
      },
    },
    defaultVariants: {
      size: 'sm',
      status: 'default',
    },
  }),
};

// Types
export interface DropdownItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  value: string;
  setValue: (value: string) => void;
  size?: 'sm' | 'base' | 'md';
  data: DropdownItem[];
  placeholder: string;
  isSearch?: boolean;
  className?: string;
  widthClassName?: string;
  children?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  disabled?: boolean;
  error?: boolean;
  subElement?: React.ReactNode;
  align?: 'center' | 'start' | 'end';
  iconClassName?: string;
}

export interface OptionDropdownProps extends PopoverContentProps {
  size?: 'sm' | 'base' | 'md';
  data: {
    label: string | React.ReactNode;
    onSelect: () => void;
    className?: string;
  }[];
  isSearch?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface InputDropdownProps {
  value: string;
  setValue: (value: string) => void;
  size?: 'sm' | 'base' | 'md';
  data: DropdownItem[];
  placeholder: string;
  className?: string;
  widthClassName?: string;
  error?: boolean;
}

export interface MultiDropdownProps {
  values: string[];
  setValues: (values: string[]) => void;
  size?: 'sm' | 'base' | 'md';
  data: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  className?: string;
  widthClassName?: string;
  children?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  disabled?: boolean;
  error?: boolean;
  onAddNew?: () => void;
  showAddButton?: boolean;
  label?: string;
}

// Dropdown Component
const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      value,
      setValue,
      size = 'sm',
      data,
      placeholder,
      isSearch = false,
      widthClassName,
      children,
      className,
      disabled = false,
      error = false,
      subElement,
      align,
      iconClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const selectedRef = React.useRef<HTMLDivElement | null>(null);
    const hasChildren = !!children;

    React.useEffect(() => {
      if (!open) return;
      const id = requestAnimationFrame(() => {
        selectedRef.current?.scrollIntoView({ block: 'start' });
      });
      return () => cancelAnimationFrame(id);
    }, [open, value]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild data-state={open ? 'open' : 'closed'}>
          {hasChildren ? (
            typeof children === 'function' ? (
              children(open)
            ) : (
              children
            )
          ) : (
            <Button
              ref={ref}
              variant="secondaryGray"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                'flex items-center justify-between whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-gray-50 data-[state=open]:ring-2 data-[state=open]:ring-gray-100 [&>span]:line-clamp-1',
                dropdownVariants.trigger({
                  size,
                  status: error ? 'error' : disabled ? 'disabled' : 'default',
                }),
                className
              )}
            >
              <span className="flex-1 truncate text-start">
                {value
                  ? data.find((item) => item.value === value)?.label
                  : placeholder}
              </span>
              <ArrowDown2
                size={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
                variant="Outline"
                color="currentColor"
                className={cn(
                  'shrink-0 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180',
                  open && 'rotate-180',
                  iconClassName
                )}
              />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            dropdownVariants.content({
              size,
              status: error ? 'error' : 'default',
            }),
            'w-[var(--radix-popover-trigger-width)] overflow-hidden',
            widthClassName
          )}
          align={align}
        >
          <Command
            className={cn(
              size === 'sm' || size === 'base' ? 'rounded-lg' : 'rounded-[10px]'
            )}
          >
            {isSearch && (
              <CommandInput
                placeholder="검색..."
                className={cn(dropdownVariants.input({ size }))}
                iconSize={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
              />
            )}
            <CommandList
              className="scrollbar-none"
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              {isSearch && <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>}
              <CommandGroup className="p-0">
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    ref={item.value === value ? selectedRef : undefined}
                    onSelect={() => {
                      setValue(item.value);
                      setOpen(false);
                    }}
                    disabled={item?.disabled ?? false}
                    className={cn(
                      'relative flex h-9 w-full items-center p-3 text-sm font-medium leading-4 text-gray-500',
                      dropdownVariants.item({ size }),
                      value === item.value && 'bg-blue-50 text-blue-500'
                    )}
                  >
                    <span className="flex-1 truncate">{item.label}</span>
                    <Check
                      size={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
                      className={cn(
                        'ml-auto',
                        value === item.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
                {subElement && subElement}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
Dropdown.displayName = 'Dropdown';

// OptionDropdown Component
const OptionDropdown = React.forwardRef<HTMLButtonElement, OptionDropdownProps>(
  (
    { children, size = 'sm', data, isSearch = false, className, ...props },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild ref={ref}>
          {children}
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            dropdownVariants.content({ size }),
            'w-[var(--radix-popover-trigger-width)] overflow-hidden',
            className
          )}
          {...props}
        >
          <Command
            className={cn(
              size === 'sm' || size === 'base' ? 'rounded-lg' : 'rounded-[10px]'
            )}
          >
            {isSearch && (
              <CommandInput
                placeholder="검색..."
                className={cn(dropdownVariants.input({ size }))}
                iconSize={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
              />
            )}
            <CommandList className="scrollbar-none overflow-y-auto">
              {isSearch && <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>}
              <CommandGroup className="p-0 first-of-type:rounded-t-lg">
                {data.map((item, index) => (
                  <CommandItem
                    key={typeof item.label === 'string' ? item.label : index}
                    onSelect={() => {
                      item.onSelect();
                      setOpen(false);
                    }}
                    className={cn(
                      'relative flex h-9 w-full items-center p-3 text-sm font-medium leading-4 text-gray-500',
                      dropdownVariants.item({ size }),
                      item.className
                    )}
                  >
                    <span className="flex-1 truncate">{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
OptionDropdown.displayName = 'OptionDropdown';

// InputDropdown Component
const InputDropdown = React.forwardRef<HTMLDivElement, InputDropdownProps>(
  (
    {
      value,
      setValue,
      size = 'sm',
      data,
      placeholder,
      widthClassName,
      className,
      error = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState(value || '');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const inputVariants = {
      trigger: cva('text-gray-500', {
        variants: {
          size: {
            sm: 'h-9 rounded-lg px-3 text-[13px] leading-4 py-2 w-[168px]',
            base: 'h-10 rounded-lg px-3.5 text-sm leading-5 py-2.5 w-[184px]',
            md: 'h-12 rounded-[10px] px-4 text-base leading-5 py-3 w-[200px]',
          },
          status: {
            default: '',
            error: 'border-red-500',
          },
        },
      }),
      item: cva('text-sm leading-4 text-gray-500', {
        variants: {
          size: {
            sm: 'h-9 text-[13px] leading-4 px-2.5 py-3.5',
            base: 'h-10 text-sm leading-5 px-3 py-3',
            md: 'h-12 text-base leading-5 px-4 py-3.5',
          },
        },
      }),
      input: cva('h-9 text-[13px] leading-4', {
        variants: {
          size: {
            sm: 'h-9 text-[13px] leading-4',
            base: 'h-10 text-sm leading-5',
            md: 'h-12 text-base leading-5',
          },
        },
      }),
      content: cva('border border-gray-300 bg-popover p-0 shadow-md', {
        variants: {
          size: {
            sm: 'w-[168px] rounded-lg',
            base: 'w-[184px] rounded-lg',
            md: 'w-[200px] rounded-[10px]',
          },
        },
      }),
    };

    React.useEffect(() => {
      if (!open) {
        setSearchValue(value || '');
      }
    }, [open, value]);

    return (
      <Command
        ref={ref}
        className={cn(
          size === 'sm' || size === 'base' ? 'rounded-lg' : 'rounded-[10px]',
          'border',
          error ? 'border-red-500' : 'border-gray-300'
        )}
      >
        <div
          className={cn(
            'flex items-center text-gray-500',
            inputVariants.trigger({
              size,
              status: error ? 'error' : 'default',
            }),
            className
          )}
        >
          <SearchNormal1
            size={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
            color="currentColor"
            className={cn(
              'mr-2 shrink-0 text-gray-500',
              open && 'text-blue-500'
            )}
          />
          <input
            ref={inputRef}
            className={cn(
              inputVariants.input({ size }),
              'h-auto w-full placeholder:text-gray-300'
            )}
            value={searchValue}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {value && (
            <CloseCircle
              variant="Bold"
              size={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
              color="currentColor"
              className="ml-2 shrink-0 cursor-pointer text-blue-500"
              onMouseDown={(e) => {
                e.preventDefault();
                setSearchValue('');
                setOpen(true);
                inputRef.current?.focus();
              }}
            />
          )}
        </div>
        {open && (
          <CommandList className={widthClassName}>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup className="p-0">
              {data
                .filter((item) =>
                  item.label.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      setValue(item.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'relative flex h-9 w-full items-center p-3 text-sm font-medium leading-4 text-gray-500',
                      inputVariants.item({ size }),
                      value === item.value && 'bg-blue-50 text-blue-500'
                    )}
                  >
                    {typeof item.label === 'string' ? (
                      <span className="flex-1 truncate">{item.label}</span>
                    ) : (
                      item.label
                    )}
                    <Check
                      size={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
                      className={cn(
                        'ml-auto',
                        value === item.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    );
  }
);
InputDropdown.displayName = 'InputDropdown';

// MultiDropdown Component
const MultiDropdown = React.forwardRef<HTMLButtonElement, MultiDropdownProps>(
  (
    {
      values,
      setValues,
      size = 'sm',
      data,
      placeholder,
      widthClassName,
      children,
      className,
      disabled = false,
      error = false,
      onAddNew,
      showAddButton = false,
      label,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue] = React.useState('');
    const hasChildren = !!children;

    const filteredData = React.useMemo(() => {
      if (!searchValue) return data;
      return data.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [data, searchValue]);

    const handleSelectAll = () => {
      const allValues = filteredData.map((item) => item.value);
      setValues(allValues);
    };

    const handleDeselectAll = () => {
      setValues([]);
    };

    const handleItemToggle = (value: string) => {
      if (values.includes(value)) {
        setValues(values.filter((v) => v !== value));
      } else {
        setValues([...values, value]);
      }
    };

    const hasSelectedItems = values.length > 0;

    const displayText = React.useMemo(() => {
      if (!hasSelectedItems) return placeholder;
      const isAllSelected = values.length === data.length && data.length > 0;
      if (isAllSelected && label) return `모든 ${label}`;
      if (label) return `${label} (${values.length}개 선택됨)`;
      return `${values.length}개 선택됨`;
    }, [hasSelectedItems, values.length, data.length, label, placeholder]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {hasChildren ? (
            typeof children === 'function' ? (
              children(open)
            ) : (
              children
            )
          ) : (
            <Button
              ref={ref}
              variant="secondaryGray"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                'flex items-center justify-between whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-gray-50 data-[state=open]:ring-2 data-[state=open]:ring-gray-100 [&>span]:line-clamp-1',
                dropdownVariants.trigger({
                  size,
                  status: error ? 'error' : disabled ? 'disabled' : 'default',
                }),
                className
              )}
            >
              <span className="flex-1 truncate text-start text-[13px] font-medium leading-[120%] text-gray-600">
                {displayText}
              </span>
              <ChevronDown
                size={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
                className={cn(
                  'shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180',
                  open && 'rotate-180'
                )}
              />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            dropdownVariants.content({
              size,
              status: error ? 'error' : 'default',
            }),
            'w-[var(--radix-popover-trigger-width)] overflow-hidden',
            widthClassName
          )}
        >
          <Command
            className={cn(
              size === 'sm' || size === 'base' ? 'rounded-lg' : 'rounded-[10px]'
            )}
          >
            <div className="relative border-b border-gray-200">
              <CommandInput
                placeholder="검색..."
                className={cn(dropdownVariants.input({ size }))}
                iconSize={size === 'sm' ? 16 : size === 'base' ? 18 : 20}
              />
            </div>

            <div className="flex items-center justify-between p-3">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-medium text-blue-400 hover:text-blue-500"
              >
                전체 선택
              </button>
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-xs font-medium text-red-400 hover:text-red-500"
              >
                전체 해제
              </button>
            </div>

            <CommandList className="scrollbar-none max-h-[200px] border-gray-100">
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <CommandGroup className="p-0">
                {filteredData.map((item) => {
                  const isSelected = values.includes(item.value);
                  return (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={() => handleItemToggle(item.value)}
                      className={cn(
                        'relative flex h-9 w-full cursor-pointer items-center gap-2 p-3 text-sm font-medium leading-4 text-gray-500',
                        dropdownVariants.item({ size }),
                        isSelected &&
                          'border-none bg-blue-50 text-blue-500 ring-0'
                      )}
                    >
                      <Checkbox checked={isSelected} />
                      <span className="flex-1 truncate text-[13px] font-medium text-gray-500">
                        {item.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>

            {showAddButton && onAddNew && (
              <div className="border-t border-gray-200 p-2">
                <button
                  type="button"
                  onClick={() => {
                    onAddNew();
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-blue-500 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" />
                  <span>추가하기</span>
                </button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
MultiDropdown.displayName = 'MultiDropdown';

export {
  Dropdown,
  OptionDropdown,
  InputDropdown,
  MultiDropdown,
  dropdownVariants,
};
