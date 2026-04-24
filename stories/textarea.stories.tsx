import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Textarea } from '../src/components/ui/textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Size
| Code | min-height | 라운드 | 폰트 |
|------|-----------|--------|------|
| \`sm\` | 60px | 8px | 13px |
| \`base\` | 72px | 10px | 14px |
| \`md\` | 96px | 10px | 16px |
| \`lg\` | 120px | 12px | 20px |

### Variant
| Code | 용도 |
|------|------|
| \`default\` | 일반 입력 |
| \`error\` | 에러 상태 (빨간 테두리) |
| \`success\` | 성공 상태 (초록 테두리) |

### Props
- \`size\`: 크기
- \`variant\`: 상태 스타일
- \`error\`: \`true\`면 \`variant\`를 \`error\`로 강제
- \`wrapperClassName\`: 바깥 래퍼 div의 추가 className
- \`className\`: 내부 textarea의 추가 className
- 그 외 \`HTMLTextAreaElement\` 속성 모두 지원
    `,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  args: {
    size: 'sm',
    variant: 'default',
    placeholder: '내용을 입력하세요.',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

// ============================================
// Error
// ============================================

export const Error: Story = {
  args: {
    size: 'sm',
    error: true,
    placeholder: '에러 상태 예시',
    defaultValue: '잘못된 입력입니다.',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

// ============================================
// Success
// ============================================

export const Success: Story = {
  args: {
    size: 'sm',
    variant: 'success',
    placeholder: '성공 상태 예시',
    defaultValue: '정상 입력입니다.',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  args: {
    size: 'sm',
    disabled: true,
    defaultValue: '수정 불가 상태',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Textarea size="sm" placeholder="sm" />
      <Textarea size="base" placeholder="base" />
      <Textarea size="md" placeholder="md" />
      <Textarea size="lg" placeholder="lg" />
    </div>
  ),
};
