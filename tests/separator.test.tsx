import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Separator } from '../src/components/ui/separator';

describe('Separator', () => {
  afterEach(() => cleanup());

  it('renders with decorative role by default', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'none');
  });

  it('renders with separator role when decorative is false', () => {
    render(<Separator decorative={false} data-testid="sep" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveAttribute('role', 'separator');
    expect(sep).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('sets aria-orientation to vertical when specified', () => {
    render(
      <Separator decorative={false} orientation="vertical" data-testid="sep" />,
    );
    expect(screen.getByTestId('sep')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('merges custom className', () => {
    render(<Separator className="custom-class" data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveClass('custom-class');
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
