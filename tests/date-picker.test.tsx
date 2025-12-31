import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DatePicker } from '../src/components/ui/date-picker';

describe('DatePicker', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Single Mode', () => {
    it('renders with placeholder', () => {
      render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={() => {}}
          placeholder="날짜 선택"
        />,
      );
      expect(screen.getByText('날짜 선택')).toBeInTheDocument();
    });

    it('renders with selected date', () => {
      const date = new Date(2024, 0, 15); // 2024-01-15
      render(
        <DatePicker
          mode="single"
          value={date}
          onChange={() => {}}
          formatString="yyyy.MM.dd"
        />,
      );
      expect(screen.getByText('2024.01.15')).toBeInTheDocument();
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <DatePicker
          mode="single"
          size="sm"
          value={undefined}
          onChange={() => {}}
          placeholder="test"
        />,
      );
      expect(screen.getByRole('button')).toHaveClass('h-9');

      rerender(
        <DatePicker
          mode="single"
          size="md"
          value={undefined}
          onChange={() => {}}
          placeholder="test"
        />,
      );
      expect(screen.getByRole('button')).toHaveClass('h-12');
    });

    it('applies disabled state correctly', () => {
      render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={() => {}}
          disabled
          placeholder="test"
        />,
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies error state correctly', () => {
      render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={() => {}}
          error
          placeholder="test"
        />,
      );
      expect(screen.getByRole('button')).toHaveClass('border-red-500');
    });

    it('hides arrow when showArrow is false', () => {
      const { container } = render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={() => {}}
          showArrow={false}
          placeholder="test"
        />,
      );
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('opens popover when clicked', () => {
      render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={() => {}}
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('calls onChange when date is selected', () => {
      const onChange = vi.fn();
      render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={onChange}
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      const gridCells = screen.getAllByRole('gridcell');
      const validDayButton = gridCells.find(
        (cell) => cell.querySelector('button') !== null,
      );
      if (validDayButton) {
        const button = validDayButton.querySelector('button');
        if (button) fireEvent.click(button);
      }

      expect(onChange).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(
        <DatePicker
          mode="single"
          value={undefined}
          onChange={() => {}}
          className="custom-class"
          placeholder="test"
        />,
      );
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('Range Mode', () => {
    it('renders with placeholder', () => {
      render(
        <DatePicker
          mode="range"
          value={undefined}
          onChange={() => {}}
          placeholder="기간 선택"
        />,
      );
      expect(screen.getByText('기간 선택')).toBeInTheDocument();
    });

    it('renders with selected range', () => {
      const range: DateRange = {
        from: new Date(2024, 0, 10),
        to: new Date(2024, 0, 20),
      };
      render(
        <DatePicker
          mode="range"
          value={range}
          onChange={() => {}}
          formatString="yyyy.MM.dd"
        />,
      );
      expect(screen.getByText('2024.01.10 - 2024.01.20')).toBeInTheDocument();
    });

    it('renders partial range (only from)', () => {
      const range: DateRange = {
        from: new Date(2024, 0, 10),
        to: undefined,
      };
      render(
        <DatePicker
          mode="range"
          value={range}
          onChange={() => {}}
          formatString="yyyy.MM.dd"
          placeholder="일정"
        />,
      );
      expect(screen.getByText(/2024\.01\.10 - 종료일정/)).toBeInTheDocument();
    });

    it('opens popover when clicked', () => {
      render(
        <DatePicker
          mode="range"
          value={undefined}
          onChange={() => {}}
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('calls onChange when date is selected', () => {
      const onChange = vi.fn();
      render(
        <DatePicker
          mode="range"
          value={undefined}
          onChange={onChange}
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      const gridCells = screen.getAllByRole('gridcell');
      const validDayButton = gridCells.find(
        (cell) => cell.querySelector('button') !== null,
      );
      if (validDayButton) {
        const button = validDayButton.querySelector('button');
        if (button) fireEvent.click(button);
      }

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Time Panel', () => {
    it('renders time panel when timeType is panel', () => {
      render(
        <DatePicker
          mode="single"
          value={new Date()}
          onChange={() => {}}
          timeType="panel"
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByText('시간')).toBeInTheDocument();
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('renders 144 time slots (24h * 6 per hour)', () => {
      render(
        <DatePicker
          mode="single"
          value={new Date()}
          onChange={() => {}}
          timeType="panel"
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      const timeSlots = screen.getAllByRole('button', { name: /^\d{2}:\d{2}$/ });
      expect(timeSlots.length).toBe(144);
    });

    it('calls onChange when time slot is clicked', () => {
      const onChange = vi.fn();
      const date = new Date(2024, 0, 15, 10, 0);
      render(
        <DatePicker
          mode="single"
          value={date}
          onChange={onChange}
          timeType="panel"
          placeholder="test"
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      fireEvent.click(screen.getByText('14:30'));

      expect(onChange).toHaveBeenCalled();
      const calledDate = onChange.mock.calls[0][0] as Date;
      expect(calledDate.getHours()).toBe(14);
      expect(calledDate.getMinutes()).toBe(30);
    });
  });

  describe('Bottom Element', () => {
    it('renders bottom element when provided', () => {
      render(
        <DatePicker
          mode="single"
          value={new Date()}
          onChange={() => {}}
          placeholder="test"
          bottomElement={<div data-testid="bottom-element">Custom Bottom</div>}
        />,
      );

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId('bottom-element')).toBeInTheDocument();
    });
  });
});
