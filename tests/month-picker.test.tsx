import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MonthPicker } from '../src/components/ui/month-picker';

describe('MonthPicker', () => {
  afterEach(() => {
    cleanup();
    // fake timer를 사용한 테스트가 있어도 서로 오염되지 않도록 항상 실제 타이머로 복구
    vi.useRealTimers();
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

  it('shows the "YYYY. M" label in the panel header (no dropdown)', () => {
    render(<MonthPicker value={new Date(2026, 4, 1)} onChange={() => {}} />);

    fireEvent.click(screen.getByText('2026.05'));

    // 헤더 라벨: 점 뒤 공백 + 월 leading-zero 없음
    expect(screen.getByText('2026. 5')).toBeInTheDocument();
    // 연/월 드롭다운(combobox)이 더 이상 없어야 함
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
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

  // 시나리오 1: value 미선택 상태로 열면 헤더 라벨이 "현재연도. 현재월"이어야 함
  // (displayMonth가 today 기준). 현재 시각 의존 → fake timer로 고정해 flaky 방지.
  it('shows the "current year. current month" label when opened without a value', () => {
    // 2026년 3월(0-base 2)로 시스템 시각 고정
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 2, 15));

    render(
      <MonthPicker
        value={undefined}
        onChange={() => {}}
        placeholder="조회월 선택"
      />,
    );

    fireEvent.click(screen.getByText('조회월 선택'));

    // 헤더 라벨은 현재연도(2026) + 현재월(3월 → "3")
    expect(screen.getByText('2026. 3')).toBeInTheDocument();
  });

  // 시나리오 2: 연초(1월)에서 이전 달로 이동하면 헤더 라벨의 "연도"까지 함께 갱신되어야 함.
  // MonthPicker는 controlled이므로 화살표 클릭 → onChange로 부모가 value를 갱신하고
  // 리렌더된 뒤에야 라벨 월이 반영된다. 실제 사용 형태(controlled wrapper)로 검증.
  it('updates the header label year when stepping back across the year boundary', () => {
    let currentValue = new Date(2026, 0, 1); // 2026.01
    const handleChange = vi.fn((next: Date | undefined) => {
      currentValue = next as Date;
    });

    const { rerender } = render(
      <MonthPicker value={currentValue} onChange={handleChange} open />,
    );

    // 이동 전 라벨: "2026. 1"
    expect(screen.getByText('2026. 1')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('이전 달'));

    // controlled: 부모가 갱신한 value를 다시 주입
    rerender(<MonthPicker value={currentValue} onChange={handleChange} open />);

    // 헤더 라벨이 연도까지 넘어가 "2025. 12"로 갱신되어야 함
    expect(screen.getByText('2025. 12')).toBeInTheDocument();
    expect(screen.queryByText('2026. 1')).not.toBeInTheDocument();
  });

  // 시나리오 3: 헤더 라벨 월 포맷 — 점 뒤 공백 + leading-zero 없음.
  // 한 자리 월("2026. 5")과 두 자리 월("2026. 12")을 각각 명시적으로 구분 검증.
  it('renders the header label month without leading zero and with a space after the dot', () => {
    // 한 자리 월: "2026. 5" (트리거는 "2026.05"로 leading-zero 있음과 구분)
    const { rerender } = render(
      <MonthPicker value={new Date(2026, 4, 1)} onChange={() => {}} open />,
    );
    expect(screen.getByText('2026. 5')).toBeInTheDocument();
    expect(screen.queryByText('2026. 05')).not.toBeInTheDocument();

    // 두 자리 월: "2026. 12" (점 뒤 공백이 유지됨)
    // 참고: 트리거는 formatString 'yyyy.MM' → "2026.12"를 별도로 렌더하므로
    // 여기서는 헤더 라벨("2026. 12")의 존재만 명시적으로 검증한다.
    rerender(
      <MonthPicker value={new Date(2026, 11, 1)} onChange={() => {}} open />,
    );
    expect(screen.getByText('2026. 12')).toBeInTheDocument();
  });
});
