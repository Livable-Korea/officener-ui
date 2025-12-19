import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Title,
  Primary,
  Controls,
  Stories,
  Description,
  Markdown,
} from '@storybook/blocks';
import { fn } from '@storybook/test';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Variant (Figma Type)
| Code | Figma |
|------|-------|
| \`primary\` | Primary |
| \`accent\` | Accent |
| \`neutral\` | Neutral |
| \`warning\` | warn |
| \`error\` | Error |
| \`secondaryBlue\` | Secondary-blue |
| \`secondaryGray\` | Secondary-gray |
| \`secondaryRed\` | Secondary-red |
| \`ghostBlue\` | Ghost-blue |
| \`ghostGray\` | Ghost-gray |
| \`ghostRed\` | ghost-red |
| \`green\` | _(코드 전용)_ |

### Size (Figma Size)
| Code | Figma |
|------|-------|
| \`sm\` | Btn_Sm |
| \`base\` | Btn_Base |
| \`md\` | Btn_Md |
| \`lg\` | Btn_Lg |
| \`icon\` | _(코드 전용)_ |

### State
- Default, Hover, Pressed, Disabled, Loading

### Props
- \`variant\`: 버튼 스타일
- \`size\`: 버튼 크기
- \`disabled\`: 비활성화 상태
- \`isLoading\`: 로딩 상태 (스피너 표시)
- \`children\`: 버튼 내용 (string | ReactNode)
- \`asChild\`: Slot으로 렌더링 (Radix UI)
        `,
  },
  argTypes: {
    children: {
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    asChild: { table: { disable: true } },
    onClick: { table: { disable: true } },
    isLoading: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button' },
};
