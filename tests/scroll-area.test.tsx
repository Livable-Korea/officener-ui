import { cleanup, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ScrollArea } from '../src/components/ui/scroll-area';

describe('ScrollArea', () => {
  afterEach(() => cleanup());

  it('renders children', () => {
    render(
      <ScrollArea>
        <div>scrollable content</div>
      </ScrollArea>,
    );
    expect(screen.getByText('scrollable content')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(
      <ScrollArea className="h-40" data-testid="scroll">
        <div>x</div>
      </ScrollArea>,
    );
    expect(screen.getByTestId('scroll')).toHaveClass('h-40');
  });

  it('forwards ref to root', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ScrollArea ref={ref}>
        <div>x</div>
      </ScrollArea>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders a viewport inside the root', () => {
    const { container } = render(
      <ScrollArea>
        <div>content</div>
      </ScrollArea>,
    );
    expect(
      container.querySelector('[data-radix-scroll-area-viewport]'),
    ).not.toBeNull();
  });
});
