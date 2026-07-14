import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileUpload } from '../src/components/ui/file-upload';

function makeFile(
  name = 'sample.xlsx',
  size = 100,
  type = 'application/vnd.ms-excel',
) {
  return new File(['a'.repeat(size)], name, { type });
}

describe('FileUpload', () => {
  afterEach(() => cleanup());

  it('renders default button label and drag text', () => {
    render(<FileUpload onFileSelect={() => undefined} />);
    expect(screen.getByText('파일업로드')).toBeInTheDocument();
    expect(
      screen.getByText('또는 파일을 여기로 드래그하세요'),
    ).toBeInTheDocument();
  });

  it('renders custom labels and hint', () => {
    render(
      <FileUpload
        onFileSelect={() => undefined}
        buttonLabel="이미지 선택"
        dragText="끌어다 놓으세요"
        hint="10MB 이하"
      />,
    );
    expect(screen.getByText('이미지 선택')).toBeInTheDocument();
    expect(screen.getByText('끌어다 놓으세요')).toBeInTheDocument();
    expect(screen.getByText('10MB 이하')).toBeInTheDocument();
  });

  it('passes raw extension list to underlying input', () => {
    const { container } = render(
      <FileUpload onFileSelect={() => undefined} accept={['.xlsx', '.xls']} />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('.xlsx,.xls');
  });

  it('resolves "excel" preset into excel extensions', () => {
    const { container } = render(
      <FileUpload onFileSelect={() => undefined} accept="excel" />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('.xlsx,.xls');
  });

  it('resolves "image" preset into image/*', () => {
    const { container } = render(
      <FileUpload onFileSelect={() => undefined} accept="image" />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('image/*');
  });

  it('resolves an array of presets and joins with comma', () => {
    const { container } = render(
      <FileUpload onFileSelect={() => undefined} accept={['pdf', 'word']} />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('.pdf,application/pdf,.doc,.docx');
  });

  it('mixes presets, extensions and MIME types in a single array', () => {
    const { container } = render(
      <FileUpload
        onFileSelect={() => undefined}
        accept={['image', '.pdf', 'application/json']}
      />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('image/*,.pdf,application/json');
  });

  it('omits accept attribute when undefined', () => {
    const { container } = render(<FileUpload onFileSelect={() => undefined} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toBe('');
  });

  it('calls onFileSelect when a file is chosen via input', () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = makeFile();
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it('calls onFileSelect when a file is dropped', () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} />);
    const label = container.querySelector('label') as HTMLLabelElement;
    const file = makeFile('drop.xlsx');
    fireEvent.drop(label, { dataTransfer: { files: [file] } });
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it('toggles border color on drag enter and leave', () => {
    const { container } = render(<FileUpload onFileSelect={() => undefined} />);
    const label = container.querySelector('label') as HTMLLabelElement;
    fireEvent.dragEnter(label);
    expect(label).toHaveClass('border-blue-500');
    fireEvent.dragLeave(label);
    expect(label).not.toHaveClass('border-blue-500');
  });

  it('does not fire callbacks when disabled', () => {
    const onFileSelect = vi.fn();
    const { container } = render(
      <FileUpload onFileSelect={onFileSelect} disabled />,
    );
    const label = container.querySelector('label') as HTMLLabelElement;
    expect(label).toHaveClass('pointer-events-none', 'opacity-40');

    fireEvent.drop(label, { dataTransfer: { files: [makeFile()] } });
    expect(onFileSelect).not.toHaveBeenCalled();
  });

  it('hides the omitted hint when not provided', () => {
    const { container } = render(<FileUpload onFileSelect={() => undefined} />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('merges custom className on the label root', () => {
    const { container } = render(
      <FileUpload onFileSelect={() => undefined} className="custom-class" />,
    );
    const label = container.querySelector('label') as HTMLLabelElement;
    expect(label).toHaveClass('custom-class');
  });

  it('forwards ref to label element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<FileUpload onFileSelect={() => undefined} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('shows red border and error message when error is provided', () => {
    const { container } = render(
      <FileUpload onFileSelect={() => undefined} error="파일을 첨부해주세요." />,
    );
    const label = container.querySelector('label') as HTMLLabelElement;
    expect(label).toHaveClass('border-red-500');
    expect(screen.getByText('파일을 첨부해주세요.')).toBeInTheDocument();
  });

  it('does not render error message when error is omitted', () => {
    render(<FileUpload onFileSelect={() => undefined} />);
    expect(screen.queryByText('파일을 첨부해주세요.')).not.toBeInTheDocument();
  });
});
