import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Chip } from '../src/components/ui/chip';

describe('Chip', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children correctly', () => {
    render(<Chip>Test Chip</Chip>);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Chip size="sm">Small</Chip>);
    expect(screen.getByText('Small')).toHaveClass('h-6', 'px-2');

    rerender(<Chip size="md">Medium</Chip>);
    expect(screen.getByText('Medium')).toHaveClass('h-8', 'px-3');
  });

  it('applies theme variants correctly', () => {
    render(<Chip theme="blue">Blue Chip</Chip>);
    expect(screen.getByText('Blue Chip')).toHaveClass('text-blue-500');
  });

  it('applies dashed border correctly', () => {
    render(<Chip dashed>Dashed Chip</Chip>);
    expect(screen.getByText('Dashed Chip')).toHaveClass('border-dashed');
  });

  it('applies disabled state correctly', () => {
    render(<Chip disabled>Disabled Chip</Chip>);
    const chip = screen.getByText('Disabled Chip');
    expect(chip).toHaveClass('opacity-40');
    expect(chip).toHaveAttribute('aria-disabled', 'true');
  });

  it('supports asChild pattern', () => {
    render(
      <Chip asChild>
        <button type="button">Button Chip</button>
      </Chip>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    render(<Chip className="custom-class">Custom</Chip>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });
});
