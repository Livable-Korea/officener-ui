import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Textarea } from '../src/components/ui/textarea';

describe('Textarea', () => {
  afterEach(() => cleanup());

  it('renders with placeholder', () => {
    render(<Textarea placeholder="내용을 입력하세요" />);
    expect(
      screen.getByPlaceholderText('내용을 입력하세요'),
    ).toBeInTheDocument();
  });

  it('calls onChange when typed', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'hello' },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies error variant when error prop is true', () => {
    render(<Textarea error />);
    const wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper?.className).toMatch(/border-red-500/);
  });

  it('forwards ref to textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies size variant classes on wrapper', () => {
    const { rerender } = render(<Textarea size="sm" />);
    let wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper?.className).toMatch(/min-h-\[60px\]/);
    rerender(<Textarea size="lg" />);
    wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper?.className).toMatch(/min-h-\[120px\]/);
  });
});
