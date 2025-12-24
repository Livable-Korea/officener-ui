import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Input } from '../src/components/ui/input';

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { container, rerender } = render(
      <Input size="sm" placeholder="test" />,
    );
    expect(container.firstChild).toHaveClass('h-9');

    rerender(<Input size="md" placeholder="test" />);
    expect(container.firstChild).toHaveClass('h-12');

    rerender(<Input size="lg" placeholder="test" />);
    expect(container.firstChild).toHaveClass('h-[52px]');
  });

  it('applies error variant when error prop is true', () => {
    const { container } = render(<Input error placeholder="test" />);
    expect(container.firstChild).toHaveClass('border-red-500');
  });

  it('applies success variant correctly', () => {
    const { container } = render(
      <Input variant="success" placeholder="test" />,
    );
    expect(container.firstChild).toHaveClass('border-green-500');
  });

  it('renders leftElement', () => {
    render(
      <Input
        leftElement={<span data-testid="left-icon">L</span>}
        placeholder="test"
      />,
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightElement', () => {
    render(
      <Input
        rightElement={<span data-testid="right-icon">R</span>}
        placeholder="test"
      />,
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    const { container } = render(<Input disabled placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toBeDisabled();
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });

  it('focuses input when container is clicked', () => {
    const { container } = render(<Input placeholder="test" />);

    fireEvent.click(container.firstChild as Element);
    expect(screen.getByPlaceholderText('test')).toHaveFocus();
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <Input className="custom-class" placeholder="test" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies inputClassName to input element', () => {
    render(<Input inputClassName="input-custom" placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-custom');
  });
});
