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

  describe('navigationUnit="year"', () => {
    it('moves only the header year without committing onChange', () => {
      const handleChange = vi.fn<(date: Date | undefined) => void>();
      const onPrev = vi.fn<(date: Date) => void>();
      const onNext = vi.fn<(date: Date) => void>();
      render(
        <MonthPicker
          value={new Date(2026, 4, 1)}
          onChange={handleChange}
          onPrev={onPrev}
          onNext={onNext}
          navigationUnit="year"
          fromYear={2024}
          toYear={2027}
          open
        />,
      );

      // year 모드 헤더 라벨은 연도만 표시
      expect(screen.getByText('2026년')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('이전 연도'));
      expect(screen.getByText('2025년')).toBeInTheDocument();
      expect(handleChange).not.toHaveBeenCalled();
      // onPrev는 이동된 연도의 1월 1일 Date를 받는다
      expect(onPrev.mock.calls[0][0].getFullYear()).toBe(2025);
      expect(onPrev.mock.calls[0][0].getMonth()).toBe(0);

      fireEvent.click(screen.getByLabelText('다음 연도'));
      expect(screen.getByText('2026년')).toBeInTheDocument();
      expect(handleChange).not.toHaveBeenCalled();
      expect(onNext.mock.calls[0][0].getFullYear()).toBe(2026);
      expect(onNext.mock.calls[0][0].getMonth()).toBe(0);
    });

    it('disables the arrows at the fromYear/toYear boundaries', () => {
      render(
        <MonthPicker
          value={new Date(2026, 4, 1)}
          onChange={() => {}}
          navigationUnit="year"
          fromYear={2026}
          toYear={2026}
          open
        />,
      );

      expect(screen.getByLabelText('이전 연도')).toBeDisabled();
      expect(screen.getByLabelText('다음 연도')).toBeDisabled();
    });

    it('selects a month of the navigated year from the grid and closes the panel', () => {
      const handleChange = vi.fn<(date: Date | undefined) => void>();
      const handleOpenChange = vi.fn<(open: boolean) => void>();
      render(
        <MonthPicker
          value={new Date(2026, 4, 1)}
          onChange={handleChange}
          onOpenChange={handleOpenChange}
          navigationUnit="year"
          fromYear={2024}
          toYear={2027}
          open
        />,
      );

      fireEvent.click(screen.getByLabelText('이전 연도'));
      // 연도 이동만으로는 팝오버가 닫히지 않는다
      expect(handleOpenChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('3월'));

      expect(handleChange).toHaveBeenCalledTimes(1);
      const selected = handleChange.mock.calls[0][0];
      expect(selected?.getFullYear()).toBe(2025);
      expect(selected?.getMonth()).toBe(2); // 3월
      // 그리드 선택 시에는 닫힘
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    // "전체" 필터처럼 value 미선택(undefined) 상태가 year 모드의 핵심 사용례
    it('shows the current year and no selection highlight when opened without a value', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 6, 15));

      const handleChange = vi.fn<(date: Date | undefined) => void>();
      render(
        <MonthPicker
          value={undefined}
          onChange={handleChange}
          navigationUnit="year"
          open
        />,
      );

      // 헤더는 현재 연도, 그리드에는 선택 표시가 없어야 함
      expect(screen.getByText('2026년')).toBeInTheDocument();
      expect(screen.queryAllByRole('button', { pressed: true })).toHaveLength(
        0,
      );

      // 연도 이동 후 그리드 선택 시 표시 연도 기준으로 커밋
      fireEvent.click(screen.getByLabelText('이전 연도'));
      fireEvent.click(screen.getByText('10월'));
      const selected = handleChange.mock.calls[0][0];
      expect(selected?.getFullYear()).toBe(2025);
      expect(selected?.getMonth()).toBe(9); // 10월
    });

    it('re-syncs the header year to the current year when reopened without a value', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 6, 15));

      const { rerender } = render(
        <MonthPicker
          value={undefined}
          onChange={() => {}}
          navigationUnit="year"
          open
        />,
      );

      // 다른 연도로 이동한 채 닫았다가 다시 열면 현재 연도로 복귀해야 함
      fireEvent.click(screen.getByLabelText('이전 연도'));
      expect(screen.getByText('2025년')).toBeInTheDocument();

      rerender(
        <MonthPicker
          value={undefined}
          onChange={() => {}}
          navigationUnit="year"
          open={false}
        />,
      );
      rerender(
        <MonthPicker
          value={undefined}
          onChange={() => {}}
          navigationUnit="year"
          open
        />,
      );

      expect(screen.getByText('2026년')).toBeInTheDocument();
    });

    it('re-syncs the header year to the selected value year when reopened', () => {
      const props = {
        value: new Date(2026, 4, 1),
        onChange: () => {},
        navigationUnit: 'year',
        fromYear: 2023,
        toYear: 2027,
      } as const;

      const { rerender } = render(<MonthPicker {...props} open />);

      // 선택 연도(2026)에서 2024까지 이동한 채 닫았다가 다시 열면 선택 연도로 복귀
      fireEvent.click(screen.getByLabelText('이전 연도'));
      fireEvent.click(screen.getByLabelText('이전 연도'));
      expect(screen.getByText('2024년')).toBeInTheDocument();

      rerender(<MonthPicker {...props} open={false} />);
      rerender(<MonthPicker {...props} open />);

      expect(screen.getByText('2026년')).toBeInTheDocument();
    });

    it('clamps the header year into the fromYear/toYear range for an out-of-range value', () => {
      // 하한: fromYear(2024) 아래 연도의 value여도 그리드는 범위 안에서 시작
      const { rerender } = render(
        <MonthPicker
          value={new Date(2020, 0, 1)}
          onChange={() => {}}
          navigationUnit="year"
          fromYear={2024}
          toYear={2027}
          open
        />,
      );
      expect(screen.getByText('2024년')).toBeInTheDocument();
      expect(screen.getByLabelText('이전 연도')).toBeDisabled();

      // 상한: toYear(2027) 위 연도의 value는 상한으로 클램프
      rerender(
        <MonthPicker
          value={new Date(2030, 0, 1)}
          onChange={() => {}}
          navigationUnit="year"
          fromYear={2024}
          toYear={2027}
          open
        />,
      );
      expect(screen.getByText('2027년')).toBeInTheDocument();
      expect(screen.getByLabelText('다음 연도')).toBeDisabled();
    });

    it('keeps the grid selection highlight only on the selected year', () => {
      render(
        <MonthPicker
          value={new Date(2026, 4, 1)}
          onChange={() => {}}
          navigationUnit="year"
          fromYear={2024}
          toYear={2027}
          open
        />,
      );

      // 선택 연도(2026)에서는 5월이 선택 표시
      expect(screen.getByText('5월')).toHaveAttribute('aria-pressed', 'true');

      // 다른 연도로 이동하면 선택 표시가 없어야 함
      fireEvent.click(screen.getByLabelText('이전 연도'));
      expect(screen.getByText('5월')).toHaveAttribute('aria-pressed', 'false');
    });
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
