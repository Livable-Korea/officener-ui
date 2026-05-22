import { cn } from '@/lib/utils';
import { DocumentUpload } from 'iconsax-react';
import * as React from 'react';

export type FileAcceptPreset =
  | 'image'
  | 'pdf'
  | 'excel'
  | 'word'
  | 'ppt'
  | 'csv'
  | 'document';

export type FileExtension = `.${string}`;

export type FileMimeType = `${string}/${string}`;

export type FileAcceptValue = FileAcceptPreset | FileExtension | FileMimeType;

const PRESET_TO_ACCEPT: Record<FileAcceptPreset, string> = {
  image: 'image/*',
  pdf: '.pdf,application/pdf',
  excel: '.xlsx,.xls',
  word: '.doc,.docx',
  ppt: '.ppt,.pptx',
  csv: '.csv,text/csv',
  document: '.pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx',
};

const isPreset = (value: string): value is FileAcceptPreset =>
  value in PRESET_TO_ACCEPT;

const resolveAccept = (
  accept?: FileAcceptValue | FileAcceptValue[],
): string | undefined => {
  if (!accept) return undefined;
  const values = Array.isArray(accept) ? accept : [accept];
  if (values.length === 0) return undefined;
  return values
    .map((value) => (isPreset(value) ? PRESET_TO_ACCEPT[value] : value))
    .join(',');
};

export interface FileUploadProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  onFileSelect: (file: File) => void;
  accept?: FileAcceptValue | FileAcceptValue[];
  buttonLabel?: string;
  dragText?: string;
  hint?: string;
  disabled?: boolean;
}

const FileUpload = React.forwardRef<HTMLLabelElement, FileUploadProps>(
  (
    {
      onFileSelect,
      accept,
      buttonLabel = '파일업로드',
      dragText = '또는 파일을 여기로 드래그하세요',
      hint,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [dragOver, setDragOver] = React.useState(false);
    const resolvedAccept = resolveAccept(accept);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) onFileSelect(file);
      event.target.value = '';
    };

    const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      setDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      setDragOver(false);
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      setDragOver(false);
      const file = event.dataTransfer.files[0];
      if (file) onFileSelect(file);
    };

    return (
      <label
        ref={ref}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'flex h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-gray-300 bg-white p-5 transition-colors hover:border-blue-400',
          dragOver && 'border-blue-500',
          disabled && 'pointer-events-none opacity-40',
          className,
        )}
        {...props}
      >
        <DocumentUpload size={24} variant="Bold" color="#D1D5DB" />
        <div className={cn('flex', 'items-center', 'justify-center', 'gap-1')}>
          <span
            className={cn(
              'rounded-lg',
              'border',
              'border-blue-100',
              'bg-blue-50',
              'px-2',
              'py-1',
              'text-sm',
              'font-medium',
              'leading-5',
              'text-blue-500',
            )}
          >
            {buttonLabel}
          </span>
          <span
            className={cn(
              'text-sm',
              'font-medium',
              'leading-5',
              'text-gray-500',
            )}
          >
            {dragText}
          </span>
        </div>
        {hint && (
          <p
            className={cn(
              'text-center',
              'text-sm',
              'font-normal',
              'leading-5',
              'text-gray-400',
            )}
          >
            {hint}
          </p>
        )}
        <input
          type="file"
          accept={resolvedAccept}
          disabled={disabled}
          className="hidden"
          onChange={handleChange}
        />
      </label>
    );
  },
);
FileUpload.displayName = 'FileUpload';

export { FileUpload, PRESET_TO_ACCEPT };
