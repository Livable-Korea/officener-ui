import { format } from 'date-fns';
import * as React from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Button } from '../src/components/ui/button';
import { MonthPicker } from '../src/components/ui/month-picker';

interface MonthPickerStoryArgs {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  onPrev?: (date: Date) => void;
  onNext?: (date: Date) => void;
  size?: 'sm' | 'base' | 'md';
  status?: 'default' | 'error' | 'disabled';
  placeholder?: string;
  disabled?: boolean;
  disabledMonth?: (date: Date) => boolean;
  fromYear?: number;
  toYear?: number;
  navigationUnit?: 'month' | 'year';
  formatString?: string;
  showArrow?: boolean;
  error?: boolean;
  className?: string;
}

const meta: Meta<MonthPickerStoryArgs> = {
  title: 'Components/MonthPicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-[360px] w-[200px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: false,
      description: `**선택된 월** (해당 월의 임의 일자 Date). 미선택 시 \`undefined\`. controlled.`,
      table: { type: { summary: 'Date | undefined' } },
    },
    onChange: {
      control: false,
      description:
        '**월 변경 콜백** — 그리드 선택 / 화살표 이동 시 호출. `(date: Date) => void`',
      table: { type: { summary: '(date: Date | undefined) => void' } },
    },
    onPrev: {
      control: false,
      description:
        '**이전 달(`‹`) 클릭 콜백** — 기본 onChange 후, 이동된 월(1일) Date 전달. (옵션)',
      table: { type: { summary: '(date: Date) => void' } },
    },
    onNext: {
      control: false,
      description:
        '**다음 달(`›`) 클릭 콜백** — 기본 onChange 후, 이동된 월(1일) Date 전달. (옵션)',
      table: { type: { summary: '(date: Date) => void' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'md'],
      description: `**트리거 크기**

- \`sm\`: 높이 36px, 13px
- \`base\`: 높이 40px, 14px
- \`md\`: 높이 48px, 16px`,
      table: {
        type: { summary: "'sm' | 'base' | 'md'" },
        defaultValue: { summary: 'sm' },
      },
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description:
        '**트리거 상태** — error는 빨간 테두리, disabled는 회색 비활성.',
      table: {
        type: { summary: "'default' | 'error' | 'disabled'" },
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: 'text',
      description: '**미선택 시 트리거 문구**',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'월 선택'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '**비활성화** — 트리거 클릭 불가, 회색 처리.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description:
        '**에러 상태** — `true`면 빨간 테두리. (status="error" 단축)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabledMonth: {
      control: false,
      description:
        '**비활성 월 판단** — 해당 월 1일 기준 Date를 받아 `true`면 비활성. 그리드 칸 + 화살표에 모두 적용.',
      table: { type: { summary: '(date: Date) => boolean' } },
    },
    fromYear: {
      control: 'number',
      description: '**화살표 이동 가능 시작 연도**',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '현재연도 - 10' },
      },
    },
    toYear: {
      control: 'number',
      description: '**화살표 이동 가능 끝 연도**',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '현재연도 + 1' },
      },
    },
    navigationUnit: {
      control: 'select',
      options: ['month', 'year'],
      description: `**헤더 좌우 화살표 이동 단위**

- \`month\`: 한 달 이동 + 즉시 onChange 커밋
- \`year\`: 그리드 연도만 변경 (onChange 커밋 없음, 헤더는 연도만 표시)`,
      table: {
        type: { summary: "'month' | 'year'" },
        defaultValue: { summary: 'month' },
      },
    },
    formatString: {
      control: 'text',
      description: '**트리거 표시 포맷** (date-fns)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'yyyy.MM'" },
      },
    },
    showArrow: {
      control: 'boolean',
      description: '**트리거 우측 화살표(▾) 표시 여부**',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: false,
      description: '**트리거 className** — 기본 트리거 너비/스타일 override.',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<MonthPickerStoryArgs>;

export const Default: Story = {
  args: {
    size: 'sm',
    placeholder: '조회월 선택',
  },
  render: (args) => {
    const [value, setValue] = React.useState<Date | undefined>(undefined);
    return <MonthPicker {...args} value={value} onChange={setValue} />;
  },
};

export const Selected: Story = {
  args: { size: 'sm' },
  render: (args) => {
    const [value, setValue] = React.useState<Date | undefined>(
      new Date(2026, 4, 1),
    );
    return <MonthPicker {...args} value={value} onChange={setValue} />;
  },
};

/** children으로 트리거를 직접 지정 — 기본 인풋 대신 임의의 Button 사용 */
export const CustomButtonTrigger: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<Date | undefined>(
      new Date(2026, 3, 1),
    );
    return (
      <MonthPicker {...args} value={value} onChange={setValue}>
        <Button variant="secondaryGray" size="sm">
          {value ? `${format(value, 'yyyy.MM')} 조회` : '조회월 선택'}
        </Button>
      </MonthPicker>
    );
  },
};

/** 연도 이동 모드 — 화살표가 그리드 연도만 바꾸고 선택(onChange)은 그리드 클릭 시에만 커밋 */
export const YearNavigation: Story = {
  args: {
    size: 'sm',
    placeholder: '전체',
    navigationUnit: 'year',
    fromYear: 2024,
  },
  render: (args) => {
    const [value, setValue] = React.useState<Date | undefined>(
      new Date(2026, 6, 1),
    );
    return <MonthPicker {...args} value={value} onChange={setValue} />;
  },
};

/** 미래 월 비활성 (오늘 이후 선택 불가) */
export const MaxCurrentMonth: Story = {
  args: { size: 'sm', placeholder: '조회월 선택' },
  render: (args) => {
    const [value, setValue] = React.useState<Date | undefined>(undefined);
    const now = new Date();
    const maxValue = now.getFullYear() * 12 + now.getMonth();
    return (
      <MonthPicker
        {...args}
        value={value}
        onChange={setValue}
        disabledMonth={(date) =>
          date.getFullYear() * 12 + date.getMonth() > maxValue
        }
      />
    );
  },
};
