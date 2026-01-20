import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full cursor-text items-center gap-2 border bg-white text-gray-700 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 rounded-[8px] px-2.5 py-2.5 text-[13px] leading-4",
        base: "h-[42px] rounded-[10px] p-3 text-sm leading-[18px]",
        md: "h-12 rounded-[10px] p-3.5 text-base leading-5",
        lg: "h-[52px] rounded-xl p-3.5 text-xl leading-6",
      },
      variant: {
        default:
          "border-gray-200 placeholder:text-gray-400 hover:border-blue-600 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10",
        error:
          "border-red-500 ring-2 ring-red-500/10 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10",
        success:
          "border-green-500 hover:border-green-500 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/10",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      variant,
      error = false,
      leftElement,
      rightElement,
      inputClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const finalVariant = error ? "error" : variant;

    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleContainerClick = () => {
      if (inputRef.current && !disabled) {
        inputRef.current.focus();
      }
    };

    return (
      <div
        className={cn(
          inputVariants({ size, variant: finalVariant }),
          disabled && "cursor-not-allowed bg-gray-100 hover:border-gray-200",
          className
        )}
        onClick={handleContainerClick}
      >
        {leftElement && (
          <div className="flex shrink-0 items-center justify-center text-gray-400">
            {leftElement}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full bg-transparent placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed",
            disabled && "opacity-40",
            inputClassName
          )}
          ref={inputRef}
          disabled={disabled}
          {...props}
        />
        {rightElement && (
          <div className="flex shrink-0 items-center justify-center text-gray-400">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
