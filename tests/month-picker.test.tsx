import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MonthPicker } from '../src/components/ui/month-picker';

describe('MonthPicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with placeholder when no value', () => {
    render(
      <MonthPicker
        value={undefined}
        onChange={() => {}}
        placeholder="조회월 선택"
      />,
    );
    expect(screen.getByText('조회월 선택')).toBeInTheDocument();
  });

  it('formats the selected month with formatString', () => {
    render(
      <MonthPicker
        value={new Date(2026, 4, 1)}
        onChange={() => {}}
        formatString="yyyy.MM"
      />,
    );
    expect(screen.getByText('2026.05')).toBeInTheDocument();
  });

  it('opens the panel and selects a month in the grid', () => {
    const handleChange = vi.fn();
    render(
      <MonthPicker value={new Date(2026, 4, 1)} onChange={handleChange} />,
    );

    fireEvent.click(screen.getByText('2026.05'));
    fireEvent.click(screen.getByText('3월'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    const selected = handleChange.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(2); // 0-base → 3월
  });

  it('steps one month back with the prev button', () => {
    const handleChange = vi.fn();
    render(
      <MonthPicker value={new Date(2026, 4, 1)} onChange={handleChange} />,
    );

    fireEvent.click(screen.getByText('2026.05'));
    fireEvent.click(screen.getByLabelText('이전 달'));

    const selected = handleChange.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(3); // 4월
  });

  it('crosses the year boundary stepping back from January', () => {
    const handleChange = vi.fn();
    render(
      <MonthPicker value={new Date(2026, 0, 1)} onChange={handleChange} />,
    );

    fireEvent.click(screen.getByText('2026.01'));
    fireEvent.click(screen.getByLabelText('이전 달'));

    const selected = handleChange.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2025);
    expect(selected.getMonth()).toBe(11); // 12월
  });

  it('steps one month forward with the next button', () => {
    const handleChange = vi.fn();
    render(
      <MonthPicker value={new Date(2026, 4, 1)} onChange={handleChange} />,
    );

    fireEvent.click(screen.getByText('2026.05'));
    fireEvent.click(screen.getByLabelText('다음 달'));

    const selected = handleChange.mock.calls[0][0] as Date;
    expect(selected.getFullYear()).toBe(2026);
    expect(selected.getMonth()).toBe(5); // 6월
  });

  it('fires onPrev / onNext with the stepped month', () => {
    const onChange = vi.fn();
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <MonthPicker
        value={new Date(2026, 4, 1)}
        onChange={onChange}
        onPrev={onPrev}
        onNext={onNext}
      />,
    );
    fireEvent.click(screen.getByText('2026.05'));

    fireEvent.click(screen.getByLabelText('이전 달'));
    expect((onPrev.mock.calls[0][0] as Date).getMonth()).toBe(3); // 4월

    fireEvent.click(screen.getByLabelText('다음 달'));
    expect((onNext.mock.calls[0][0] as Date).getMonth()).toBe(5); // 6월
  });

  it('disables months via disabledMonth', () => {
    const handleChange = vi.fn();
    render(
      <MonthPicker
        value={new Date(2026, 4, 1)}
        onChange={handleChange}
        disabledMonth={(date) => date.getMonth() === 11} // 12월 비활성
      />,
    );
    fireEvent.click(screen.getByText('2026.05'));

    const december = screen.getByText('12월');
    expect(december).toBeDisabled();
    fireEvent.click(december);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
