import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { RadioGroup, RadioGroupItem } from '../src/components/ui/radio-group';

describe('RadioGroup', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders radio group with items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option-1" aria-label="Option 1" />
        <RadioGroupItem value="option-2" aria-label="Option 2" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('selects default value', () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1" aria-label="Option 1" />
        <RadioGroupItem value="option-2" aria-label="Option 2" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText('Option 1')).toBeChecked();
    expect(screen.getByLabelText('Option 2')).not.toBeChecked();
  });

  it('changes selection on click', () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1" aria-label="Option 1" />
        <RadioGroupItem value="option-2" aria-label="Option 2" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(screen.getByLabelText('Option 1')).not.toBeChecked();
    expect(screen.getByLabelText('Option 2')).toBeChecked();
  });

  it('applies size variants correctly', () => {
    const { container, rerender } = render(
      <RadioGroup>
        <RadioGroupItem value="test" size="md" />
      </RadioGroup>,
    );
    expect(container.querySelector('[role="radio"]')).toHaveClass('size-4');

    rerender(
      <RadioGroup>
        <RadioGroupItem value="test" size="lg" />
      </RadioGroup>,
    );
    expect(container.querySelector('[role="radio"]')).toHaveClass('size-5');

    rerender(
      <RadioGroup>
        <RadioGroupItem value="test" size="xl" />
      </RadioGroup>,
    );
    expect(container.querySelector('[role="radio"]')).toHaveClass('size-6');
  });

  it('applies error variant when error prop is true', () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="test" error />
      </RadioGroup>,
    );
    expect(container.querySelector('[role="radio"]')).toHaveClass(
      'border-red-500',
    );
  });

  it('applies disabled state correctly', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="test" disabled aria-label="Disabled option" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText('Disabled option')).toBeDisabled();
  });

  it('applies custom className to RadioGroup', () => {
    const { container } = render(
      <RadioGroup className="custom-class">
        <RadioGroupItem value="test" />
      </RadioGroup>,
    );
    expect(container.querySelector('[role="radiogroup"]')).toHaveClass(
      'custom-class',
    );
  });

  it('applies custom className to RadioGroupItem', () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="test" className="item-custom" />
      </RadioGroup>,
    );
    expect(container.querySelector('[role="radio"]')).toHaveClass(
      'item-custom',
    );
  });
});
