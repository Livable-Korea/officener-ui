import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/ui/badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Variant (Figma Type)
| Code | Figma |
|------|-------|
| \`basic\` | Basic |
| \`rounded\` | Rounded |

### Size (Figma Size)
| Code | Figma |
|------|-------|
| \`sm\` | Small |
| \`lg\` | Large |

### Theme
| Code | 색상 |
|------|------|
| \`gray\` | 회색 |
| \`red\` | 빨강 |
| \`yellow\` | 노랑 |
| \`green\` | 초록 |
| \`blue\` | 파랑 |
| \`indigo\` | 남색 |
| \`purple\` | 보라 |
| \`pink\` | 분홍 |
| \`orange\` | 주황 |
| \`lime\` | 라임 |

### Props
- \`variant\`: 뱃지 모양 (basic: 둥근, rounded: 각진)
- \`size\`: 뱃지 크기
- \`theme\`: 뱃지 색상 테마
- \`dot\`: 좌측 도트 표시 여부
- \`removeButton\`: 우측 X 버튼 표시 여부
- \`onRemove\`: X 버튼 클릭 콜백
- \`children\`: 뱃지 내용 (string | ReactNode)
    `,
  },
  argTypes: {
    children: {
      control: 'text',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    variant: {
      control: 'select',
      options: ['basic', 'rounded'],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    theme: {
      control: 'select',
      options: [
        'gray',
        'red',
        'yellow',
        'green',
        'blue',
        'indigo',
        'purple',
        'pink',
        'orange',
        'lime',
      ],
    },
    dot: {
      control: 'boolean',
    },
    removeButton: {
      control: 'boolean',
    },
    onRemove: { action: 'removed' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  args: {
    variant: 'basic',
    size: 'sm',
    theme: 'gray',
    children: 'Badge',
  },
};

// ============================================
// With Dot
// ============================================

export const WithDot: Story = {
  args: {
    variant: 'basic',
    size: 'sm',
    theme: 'blue',
    dot: true,
    children: 'Badge',
  },
};

// ============================================
// With Remove Button
// ============================================

export const WithRemoveButton: Story = {
  args: {
    variant: 'basic',
    size: 'sm',
    theme: 'red',
    removeButton: true,
    children: 'Badge',
  },
};
