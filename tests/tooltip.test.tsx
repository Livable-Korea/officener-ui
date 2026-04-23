import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../src/components/ui/tooltip';

const renderTooltip = (open?: boolean) =>
  render(
    <TooltipProvider>
      <Tooltip {...(open !== undefined ? { open } : { defaultOpen: true })}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );

describe('Tooltip', () => {
  afterEach(() => cleanup());

  it('renders trigger content', () => {
    renderTooltip();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('renders tooltip content when defaultOpen', () => {
    renderTooltip();
    expect(screen.getAllByText('Tooltip text').length).toBeGreaterThan(0);
  });

  it('does not render content when controlled open is false', () => {
    renderTooltip(false);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('renders content when controlled open is true', () => {
    renderTooltip(true);
    expect(screen.getAllByText('Tooltip text').length).toBeGreaterThan(0);
  });
});
