import * as React from "react";
import { Button, type ButtonProps } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./dialog";

export interface AlertDialogProps {
  /** Dialog 열림 상태 */
  isOpen: boolean;
  /** Dialog 상태 변경 핸들러 */
  onOpenChange: (isOpen: boolean) => void;
  /** Alert 제목 */
  title?: string;
  /** Alert 설명 */
  description?: string | React.ReactNode;
  /** 아이콘 표시 여부 */
  isShowIcon?: boolean;
  /** 커스텀 아이콘 엘리먼트 */
  iconElement?: React.ReactNode;
  /** 버튼 레이아웃 타입 */
  buttonType?: "default" | "wide";
  /** 확인 버튼 텍스트 */
  buttonText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onClick?: () => void | Promise<void>;
  /** 확인 버튼 variant */
  buttonVariant?: ButtonProps["variant"];
  /** 취소 버튼 텍스트 */
  subButtonText?: string;
  /** 취소 버튼 클릭 핸들러 */
  onSubButtonClick?: () => void;
  /** 커스텀 children (버튼 영역 대체) */
  children?: React.ReactNode;
}

/**
 * @example
 * ```tsx
 * <AlertDialog
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="정말 삭제하시겠습니까?"
 *   description="이 작업은 되돌릴 수 없습니다."
 *   buttonType="wide"
 *   buttonText="삭제"
 *   buttonVariant="error"
 *   onClick={handleDelete}
 *   subButtonText="취소"
 * />
 * ```
 */
export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      isOpen,
      onOpenChange,
      title,
      description,
      isShowIcon = true,
      iconElement,
      buttonType = "default",
      buttonText,
      onClick,
      buttonVariant,
      subButtonText,
      onSubButtonClick,
      children,
    },
    ref,
  ) => {
    // 기본 아이콘 (lucide-react의 AlertTriangle 대신 간단한 원형)
    const defaultIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );

    const buttonElements = {
      default: (
        <div className="flex items-center p-4 pt-1">
          <DialogClose asChild>
            <Button
              size="md"
              variant={buttonVariant || "neutral"}
              className="w-full"
              onClick={onClick}
            >
              {buttonText || "확인"}
            </Button>
          </DialogClose>
        </div>
      ),
      wide: (
        <div className="flex items-center gap-3 p-4 pt-1">
          <DialogClose asChild>
            <Button
              size="md"
              variant="neutral"
              className="flex-1"
              onClick={onSubButtonClick}
            >
              {subButtonText || "취소"}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              size="md"
              variant={buttonVariant || "primary"}
              className="flex-1"
              onClick={onClick}
            >
              {buttonText || "확인"}
            </Button>
          </DialogClose>
        </div>
      ),
    };

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent ref={ref} className="max-w-[312px] p-0">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex min-h-[136px] flex-col items-center justify-center gap-2 px-4 pb-5 pt-8">
                {isShowIcon && (iconElement || defaultIcon)}
                {title && (
                  <p className="whitespace-pre-line text-center text-lg font-bold leading-6 text-gray-900">
                    {title}
                  </p>
                )}
                {description && (
                  <p className="whitespace-pre-line text-center text-sm text-gray-600">
                    {description}
                  </p>
                )}
              </div>
              {children || (buttonType && buttonElements[buttonType])}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  },
);

AlertDialog.displayName = "AlertDialog";
