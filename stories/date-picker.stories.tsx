import { format } from 'date-fns';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { DatePicker } from '../src/components/ui/date-picker';
import { Input } from '../src/components/ui/input';

// Storybook args 타입 (discriminated union 대신 통합 타입)
interface DatePickerStoryArgs {
  mode: 'single' | 'range';
  size?: 'sm' | 'base' | 'md';
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  showArrow?: boolean;
  timeType?: 'none' | 'panel' | 'input';
  formatString?: string;
  // Controls에 표시되지 않지만 문서화를 위해 포함
  value?: Date | DateRange;
  onChange?: (value: Date | DateRange | undefined) => void;
  disabledDate?: (date: Date) => boolean;
  bottomElement?: React.ReactNode;
  locale?: unknown;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onReset?: () => void;
  formatters?: unknown;
}

const meta: Meta<DatePickerStoryArgs> = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-[400px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'range'],
      description: `**선택 모드**

- \`single\`: 단일 날짜 선택. value 타입은 \`Date | undefined\`
- \`range\`: 기간 선택 (시작일 ~ 종료일). value 타입은 \`DateRange | undefined\`

Range 모드에서는 선택한 날짜들이 파란색 배경으로 연결되어 표시됩니다.`,
      table: {
        type: { summary: "'single' | 'range'" },
        defaultValue: { summary: 'single' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'md'],
      description: `**컴포넌트 크기**

- \`sm\`: 높이 36px, 텍스트 13px (Small)
- \`base\`: 높이 40px, 텍스트 14px (Base)
- \`md\`: 높이 48px, 텍스트 16px (Medium)`,
      table: {
        type: { summary: "'sm' | 'base' | 'md'" },
        defaultValue: { summary: 'sm' },
      },
    },
    timeType: {
      control: 'select',
      options: ['none', 'panel', 'input'],
      description: `**시간 선택 타입** (single 모드에서만 동작)

- \`none\`: 시간 선택 없음, 날짜만 선택
- \`panel\`: 캘린더 우측에 시간 스크롤 패널 표시 (10분 단위, 00:00 ~ 23:50)
- \`input\`: bottomElement를 사용해 커스텀 시간 입력 UI 추가

\`panel\` 사용 시 오늘 날짜에서는 현재 시간 이전이 자동 비활성화됩니다.`,
      table: {
        type: { summary: "'none' | 'panel' | 'input'" },
        defaultValue: { summary: 'none' },
      },
    },
    disabled: {
      control: 'boolean',
      description: `**비활성화 상태**

\`true\`로 설정하면 버튼이 비활성화되어 클릭할 수 없습니다.
배경색이 회색으로 변경되고 커서가 not-allowed로 표시됩니다.`,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: `**에러 상태**

\`true\`로 설정하면 빨간색 테두리로 표시됩니다.
폼 유효성 검사 실패 시 사용합니다.`,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: `**화살표 아이콘 표시**

\`true\`: 트리거 버튼 우측에 화살표(▼) 아이콘 표시
\`false\`: 아이콘 숨김

Popover가 열리면 아이콘이 180도 회전합니다.`,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    placeholder: {
      control: 'text',
      description: `**플레이스홀더 텍스트**

날짜가 선택되지 않았을 때 표시되는 텍스트입니다.

Range 모드에서는 "시작{placeholder}" - "종료{placeholder}" 형식으로 표시됩니다.`,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '날짜 선택' },
      },
    },
    formatString: {
      control: 'text',
      description: `**날짜 포맷** (date-fns 형식)

선택된 날짜가 표시되는 형식입니다. date-fns 포맷 문자열을 사용합니다.

**예시:**
- \`yyyy.MM.dd\` → 2024.01.15
- \`yyyy년 MM월 dd일\` → 2024년 01월 15일
- \`yyyy.MM.dd HH:mm\` → 2024.01.15 14:30
- \`yy/MM/dd (EEE)\` → 24/01/15 (월)

기본값은 timeType에 따라 자동 설정됩니다:
- timeType="none" → \`yyyy.MM.dd\`
- timeType="panel" → \`yyyy.MM.dd HH:mm\``,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'yyyy.MM.dd 또는 yyyy.MM.dd HH:mm' },
      },
    },
    // ============================================
    // Controls에 표시되지 않는 Props (코드로만 설정)
    // ============================================
    value: {
      description: `**선택된 값** (필수)

- single 모드: \`Date | undefined\`
- range 모드: \`DateRange | undefined\` (DateRange = { from?: Date, to?: Date })`,
      table: {
        type: { summary: 'Date | DateRange | undefined' },
        category: 'Required',
      },
      control: false,
    },
    onChange: {
      description: `**값 변경 콜백** (필수)

- single 모드: \`(date: Date | undefined) => void\`
- range 모드: \`(range: DateRange | undefined) => void\``,
      table: {
        type: { summary: '(value) => void' },
        category: 'Required',
      },
      control: false,
    },
    disabledDate: {
      description: `**특정 날짜 비활성화 함수**

날짜를 받아 boolean을 반환하는 함수입니다. true를 반환하면 해당 날짜가 비활성화됩니다.

**예시:**
오늘 이전 날짜 비활성화

disabledDate={(date) => date < new Date()}

주말 비활성화

disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}`,
      table: {
        type: { summary: '(date: Date) => boolean' },
        category: 'Optional',
      },
      control: false,
    },
    bottomElement: {
      description: `**캘린더 하단 커스텀 요소** (single 모드 전용)

캘린더 Popover 하단에 추가할 React 요소입니다.
시간 입력 필드, 빠른 선택 버튼, 확인 버튼 등을 추가할 때 사용합니다.

**예시:**
\`\`\`
bottomElement={

  <div className="border-t px-4 py-2">
    <button onClick={handleConfirm}>확인</button>
  </div>
  
}
\`\`\``,
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Optional',
      },
      control: false,
    },
    locale: {
      description: `**로케일 설정**

date-fns의 Locale 객체입니다. 요일, 월 이름 등의 언어를 설정합니다.

기본값은 한국어(ko)입니다.

**예시:**
\`\`\`tsx
import { enUS } from 'date-fns/locale';
<DatePicker locale={enUS} />
\`\`\``,
      table: {
        type: { summary: 'Locale' },
        defaultValue: { summary: 'ko' },
        category: 'Optional',
      },
      control: false,
    },
    open: {
      description: `**Popover 열림 상태 제어**

외부에서 Popover 열림/닫힘을 제어할 때 사용합니다.
\`onOpenChange\`와 함께 사용하세요.`,
      table: {
        type: { summary: 'boolean' },
        category: 'Optional',
      },
      control: false,
    },
    onOpenChange: {
      description: `**Popover 상태 변경 콜백**

Popover가 열리거나 닫힐 때 호출됩니다.
\`open\` prop과 함께 사용하여 제어 컴포넌트로 만들 수 있습니다.`,
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Optional',
      },
      control: false,
    },
    onReset: {
      description: `**Range 모드 리셋 콜백**

range 모드에서 Popover가 닫힐 때 호출됩니다.
선택이 완료되지 않은 상태(from만 선택)를 리셋할 때 사용합니다.`,
      table: {
        type: { summary: '() => void' },
        category: 'Optional (Range only)',
      },
      control: false,
    },
    formatters: {
      description: `**react-day-picker 포매터**

캘린더 내부 표시 형식을 커스터마이징합니다.
주로 년/월 드롭다운 표시 형식을 변경할 때 사용합니다.`,
      table: {
        type: { summary: 'Partial<Formatters>' },
        category: 'Optional',
      },
      control: false,
    },
  },
  args: {
    mode: 'single',
    size: 'sm',
    showArrow: true,
    disabled: false,
    error: false,
    placeholder: '날짜 선택',
    timeType: 'none',
  },
  render: function DefaultRender(args) {
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(
      undefined,
    );
    const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>(
      undefined,
    );

    // mode가 변경되면 state 초기화
    React.useEffect(() => {
      setSingleDate(undefined);
      setRangeDate(undefined);
    }, [args.mode]);

    if (args.mode === 'range') {
      return (
        <div className="w-[280px]">
          <DatePicker
            mode="range"
            value={rangeDate}
            onChange={setRangeDate}
            size={args.size}
            placeholder={args.placeholder}
            showArrow={args.showArrow}
            disabled={args.disabled}
            error={args.error}
            formatString={args.formatString}
          />
        </div>
      );
    }

    return (
      <div className="w-[200px]">
        <DatePicker
          mode="single"
          value={singleDate}
          onChange={setSingleDate}
          size={args.size}
          placeholder={args.placeholder}
          showArrow={args.showArrow}
          disabled={args.disabled}
          error={args.error}
          timeType={args.timeType}
          formatString={args.formatString}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<DatePickerStoryArgs>;

// ============================================
// Single Mode Stories
// ============================================

export const Single: Story = {
  args: {
    mode: 'single',
    size: 'base',
    placeholder: '날짜 선택',
    showArrow: true,
    disabled: false,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: '단일 날짜를 선택하는 기본 DatePicker입니다.',
      },
    },
  },
};

export const SingleWithTimePanel: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    timeType: 'panel',
    placeholder: '날짜 및 시간 선택',
    formatString: 'yyyy.MM.dd HH:mm',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: `캘린더 우측에 시간 선택 패널이 표시됩니다.

- 10분 단위로 시간 선택 (00:00 ~ 23:50)
- 오늘 날짜 선택 시 현재 시간 이전은 비활성화
- Popover 열릴 때 선택된 시간으로 자동 스크롤`,
      },
    },
  },
  render: function SingleWithTimePanelStory(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[220px]">
        <DatePicker
          mode="single"
          value={date}
          onChange={setDate}
          size={args.size}
          placeholder={args.placeholder}
          showArrow={args.showArrow}
          disabled={args.disabled}
          error={args.error}
          timeType={args.timeType}
          formatString={args.formatString}
        />
      </div>
    );
  },
};

export const SingleWithBottomElement: Story = {
  args: {
    mode: 'single',
    size: 'md',
    timeType: 'none',
    placeholder: '날짜 선택',
    formatString: 'yyyy.MM.dd HH:mm',
  },
  parameters: {
    docs: {
      description: {
        story: `\`bottomElement\` prop을 사용하여 캘린더 하단에 커스텀 UI를 추가할 수 있습니다.

시간 입력 필드, 빠른 선택 버튼 등을 추가할 때 유용합니다.`,
      },
    },
  },
  render: function SingleWithBottomElementStory(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [hour, setHour] = React.useState('10');
    const [minute, setMinute] = React.useState('30');

    React.useEffect(() => {
      if (date) {
        const newDate = new Date(date);
        newDate.setHours(
          Number.parseInt(hour) || 0,
          Number.parseInt(minute) || 0,
        );
        setDate(newDate);
      }
    }, [hour, minute]);

    return (
      <div className="w-[250px]">
        <DatePicker
          mode="single"
          value={date}
          onChange={setDate}
          size={args.size}
          placeholder={args.placeholder}
          showArrow={args.showArrow}
          disabled={args.disabled}
          error={args.error}
          timeType="none"
          formatString={args.formatString}
          bottomElement={
            <div className="flex items-center gap-2 border-t border-gray-200 px-6 py-3">
              <span className="grow text-sm font-medium text-gray-900">
                시간
              </span>
              <Input
                size="sm"
                className="w-14 text-center"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="HH"
              />
              <span className="text-gray-500">:</span>
              <Input
                size="sm"
                className="w-14 text-center"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="mm"
              />
            </div>
          }
        />
      </div>
    );
  },
};

export const SingleWithDisabledDates: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    placeholder: '날짜 선택',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: `\`disabledDate\` prop을 사용하여 특정 날짜를 비활성화할 수 있습니다.

\`\`\`tsx
// 오늘 이전 날짜 비활성화
disabledDate={(date) => date < new Date()}

// 주말 비활성화
disabledDate={(date) => date.getDay() === 0 || date.getDay() === 6}

// 특정 날짜 비활성화
const holidays = [new Date('2024-01-01'), new Date('2024-12-25')];
disabledDate={(date) => holidays.some(h => h.toDateString() === date.toDateString())}
\`\`\``,
      },
    },
  },
  render: function SingleWithDisabledDatesStory(args) {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="w-[200px]">
        <DatePicker
          mode="single"
          value={date}
          onChange={setDate}
          size={args.size}
          placeholder={args.placeholder}
          showArrow={args.showArrow}
          disabledDate={(d) => d < today}
        />
        <p className="mt-2 text-xs text-gray-500">
          오늘 이전 날짜는 선택할 수 없습니다.
        </p>
      </div>
    );
  },
};

// ============================================
// Range Mode Stories
// ============================================

export const Range: Story = {
  args: {
    mode: 'range',
    size: 'sm',
    placeholder: '기간 선택',
    showArrow: true,
    disabled: false,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: `시작일과 종료일을 선택하는 Range 모드입니다.

- 첫 번째 클릭: 시작일 선택
- 두 번째 클릭: 종료일 선택
- 선택된 기간이 파란색 배경으로 연결되어 표시됩니다.`,
      },
    },
  },
};

export const RangeWithDisabledPastDates: Story = {
  args: {
    mode: 'range',
    size: 'sm',
    placeholder: '기간 선택',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Range 모드에서도 `disabledDate`를 사용하여 특정 날짜를 비활성화할 수 있습니다.',
      },
    },
  },
  render: function RangeWithDisabledPastDatesStory(args) {
    const [range, setRange] = React.useState<DateRange | undefined>(undefined);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="min-h-[400px] w-[280px]">
        <DatePicker
          mode="range"
          value={range}
          onChange={setRange}
          size={args.size}
          placeholder={args.placeholder}
          showArrow={args.showArrow}
          disabled={args.disabled}
          error={args.error}
          disabledDate={(date) => date < today}
        />
      </div>
    );
  },
};

// ============================================
// Size Variants
// ============================================

export const Sizes: Story = {
  args: {
    mode: 'single',
    placeholder: '날짜 선택',
  },
  parameters: {
    docs: {
      description: {
        story: `세 가지 크기를 제공합니다:

| Size | Height | Font Size | 사용 예시 |
|------|--------|-----------|----------|
| \`sm\` | 36px | 13px | 테이블 필터, 밀집된 UI |
| \`base\` | 40px | 14px | 일반 폼 |
| \`md\` | 48px | 16px | 모바일, 강조 영역 |`,
      },
    },
  },
  render: function SizesStory() {
    const [dateSm, setDateSm] = React.useState<Date | undefined>(undefined);
    const [dateBase, setDateBase] = React.useState<Date | undefined>(undefined);
    const [dateMd, setDateMd] = React.useState<Date | undefined>(undefined);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">sm</span>
          <div className="w-[200px]">
            <DatePicker
              mode="single"
              size="sm"
              value={dateSm}
              onChange={setDateSm}
              placeholder="Small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">base</span>
          <div className="w-[200px]">
            <DatePicker
              mode="single"
              size="base"
              value={dateBase}
              onChange={setDateBase}
              placeholder="Base"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">md</span>
          <div className="w-[200px]">
            <DatePicker
              mode="single"
              size="md"
              value={dateMd}
              onChange={setDateMd}
              placeholder="Medium"
            />
          </div>
        </div>
      </div>
    );
  },
};

// ============================================
// States
// ============================================

export const Disabled: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    disabled: true,
    placeholder: '비활성화됨',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`disabled={true}`로 설정하면 클릭할 수 없는 비활성화 상태가 됩니다.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    error: true,
    placeholder: '날짜 선택',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`error={true}`로 설정하면 빨간색 테두리로 에러 상태를 표시합니다.',
      },
    },
  },
};

export const NoArrow: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    showArrow: false,
    placeholder: '날짜 선택',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`showArrow={false}`로 설정하면 트리거 버튼의 화살표 아이콘이 숨겨집니다.',
      },
    },
  },
};

// ============================================
// Custom Format
// ============================================

export const CustomFormat: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    formatString: 'yyyy년 MM월 dd일',
    placeholder: '날짜 선택',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story: `\`formatString\` prop으로 날짜 표시 형식을 변경할 수 있습니다.

date-fns 포맷 문자열을 사용합니다. [date-fns format 문서](https://date-fns.org/docs/format) 참조`,
      },
    },
  },
  render: function CustomFormatStory(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <div className="w-[220px]">
        <DatePicker
          mode="single"
          value={date}
          onChange={setDate}
          size={args.size}
          placeholder={args.placeholder}
          showArrow={args.showArrow}
          formatString={args.formatString}
        />
      </div>
    );
  },
};

// ============================================
// Custom Trigger (children)
// ============================================

export const CustomTrigger: Story = {
  args: {
    mode: 'single',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: `\`children\` prop을 사용하여 기본 버튼 대신 커스텀 트리거를 렌더링할 수 있습니다.

children은 \`PopoverTrigger\`의 자식으로 들어가므로, 반드시 \`forwardRef\`로 감싼 컴포넌트거나 DOM 요소여야 합니다.

\`\`\`tsx
<DatePicker mode="single" value={date} onChange={setDate}>
  <button className="custom-trigger">
    {date ? format(date, 'yyyy.MM.dd') : '날짜 선택'}
  </button>
</DatePicker>
\`\`\``,
      },
    },
  },
  render: function CustomTriggerStory() {
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
      <div className="w-[300px]">
        <DatePicker mode="single" value={date} onChange={setDate}>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            <span>📅</span>
            <span>
              {date ? format(date, 'yyyy년 MM월 dd일') : '날짜를 선택하세요'}
            </span>
          </button>
        </DatePicker>
      </div>
    );
  },
};
