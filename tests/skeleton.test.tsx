import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Skeleton } from '../src/components/ui/skeleton';

describe('Skeleton', () => {
  afterEach(() => cleanup());

  it('renders a div', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton').tagName).toBe('DIV');
  });

  it('applies pulse animation class', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
  });

  it('merges custom className', () => {
    render(<Skeleton className="h-10 w-32" data-testid="skeleton" />);
    const el = screen.getByTestId('skeleton');
    expect(el).toHaveClass('h-10', 'w-32');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through extra props', () => {
    render(<Skeleton aria-label="loading" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'aria-label',
      'loading',
    );
  });
});
