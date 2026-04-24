import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../src/components/ui/accordion';

const renderAccordion = (props?: { defaultValue?: string }) =>
  render(
    <Accordion type="single" collapsible defaultValue={props?.defaultValue}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

describe('Accordion', () => {
  afterEach(() => cleanup());

  it('renders all triggers', () => {
    renderAccordion();
    expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    expect(screen.getByText('Trigger 2')).toBeInTheDocument();
  });

  it('shows content for item expanded via defaultValue', () => {
    renderAccordion({ defaultValue: 'item-1' });
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('expands content when trigger is clicked', () => {
    renderAccordion();
    fireEvent.click(screen.getByText('Trigger 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('collapses content on second click (collapsible)', () => {
    renderAccordion({ defaultValue: 'item-1' });
    const trigger = screen.getByText('Trigger 1');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches expanded item in single mode', () => {
    renderAccordion({ defaultValue: 'item-1' });
    fireEvent.click(screen.getByText('Trigger 2'));
    expect(screen.getByText('Trigger 1')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByText('Trigger 2')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});
