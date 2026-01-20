import { type VariantProps, cva } from 'class-variance-authority';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

// CVA Variants
const stepCircleVariants = cva(
  'flex items-center justify-center rounded-full text-white font-bold transition-colors',
  {
    variants: {
      status: {
        incomplete: 'bg-gray-200 text-gray-400',
        current: 'bg-blue-500 text-white',
        complete: 'bg-blue-400 text-white',
      },
      size: {
        sm: 'h-4 w-4 text-[8px]',
        md: 'h-6 w-6 text-[10px]',
      },
    },
    defaultVariants: {
      status: 'incomplete',
      size: 'md',
    },
  },
);

const stepConnectorVariants = cva('transition-colors', {
  variants: {
    status: {
      incomplete: 'bg-gray-200',
      complete: 'bg-blue-400',
    },
    size: {
      sm: 'h-[2px] w-5',
      md: 'h-[2px] w-10',
    },
  },
  defaultVariants: {
    status: 'incomplete',
    size: 'md',
  },
});

const stepLabelVariants = cva('font-medium transition-colors', {
  variants: {
    status: {
      incomplete: 'text-gray-400',
      current: 'text-blue-500',
      complete: 'text-blue-400',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    status: 'incomplete',
    size: 'md',
  },
});

// Types
export type StepStatus = 'incomplete' | 'current' | 'complete';

export interface StepsProps extends React.ComponentProps<'div'> {
  size?: 'sm' | 'md';
}

export interface StepItemProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof stepCircleVariants> {
  /** 스텝 번호 (1부터 시작) */
  stepNumber?: number;
  /** 스텝 라벨 */
  label?: string;
  /** 아이콘 표시 여부 (complete 상태에서 체크 아이콘) */
  showIcon?: boolean;
}

export interface StepConnectorProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof stepConnectorVariants> {}

// Components
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    // Pass size to children
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { size } as Partial<StepItemProps>);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {childrenWithProps}
      </div>
    );
  },
);
Steps.displayName = 'Steps';

const StepItem = React.forwardRef<HTMLDivElement, StepItemProps>(
  (
    {
      className,
      status = 'incomplete',
      size = 'md',
      stepNumber,
      label,
      showIcon = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1 p-1', className)}
        {...props}
      >
        <div className={cn(stepCircleVariants({ status, size }))}>
          {status === 'complete' && showIcon ? (
            <Check className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
          ) : (
            stepNumber && (
              <span>{stepNumber}</span>
            )
          )}
        </div>
        {label && (
          <span className={cn(stepLabelVariants({ status, size }))}>{label}</span>
        )}
      </div>
    );
  },
);
StepItem.displayName = 'StepItem';

const StepConnector = React.forwardRef<HTMLDivElement, StepConnectorProps>(
  ({ className, status = 'incomplete', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stepConnectorVariants({ status, size }), className)}
        {...props}
      />
    );
  },
);
StepConnector.displayName = 'StepConnector';

// High-level Component Types
export interface StepData {
  label: string;
}

export interface StepsComponentProps {
  /** 스텝 목록 */
  steps: StepData[];
  /** 현재 활성 스텝 (1부터 시작) */
  currentStep: number;
  /** 사이즈 */
  size?: 'sm' | 'md';
  /** 스텝 번호 표시 여부 */
  showNumbers?: boolean;
  /** complete 상태에서 체크 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 추가 className */
  className?: string;
}

// High-level Component
const StepsComponent = ({
  steps,
  currentStep,
  size = 'md',
  showNumbers = true,
  showIcon = true,
  className,
}: StepsComponentProps) => {
  const getStatus = (index: number): StepStatus => {
    const stepIndex = index + 1;
    if (stepIndex < currentStep) return 'complete';
    if (stepIndex === currentStep) return 'current';
    return 'incomplete';
  };

  const getConnectorStatus = (
    index: number,
  ): 'complete' | 'incomplete' => {
    return index + 1 < currentStep ? 'complete' : 'incomplete';
  };

  return (
    <Steps size={size} className={className}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <StepItem
            status={getStatus(index)}
            size={size}
            stepNumber={showNumbers ? index + 1 : undefined}
            label={step.label}
            showIcon={showIcon}
          />
          {index < steps.length - 1 && (
            <StepConnector status={getConnectorStatus(index)} size={size} />
          )}
        </React.Fragment>
      ))}
    </Steps>
  );
};
StepsComponent.displayName = 'StepsComponent';

export {
  Steps,
  StepItem,
  StepConnector,
  StepsComponent,
  stepCircleVariants,
  stepConnectorVariants,
  stepLabelVariants,
};
