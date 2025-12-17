import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  parameters: {
    docs: {
      description: {
        story: `
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
- Default, Hover, Pressed, Disabled
- ⚠️ Loading: Figma에 정의되어 있으나 미구현

### Props
- \`variant\`: 버튼 스타일
- \`size\`: 버튼 크기
- \`disabled\`: 비활성화 상태
- \`children\`: 버튼 내용 (string | ReactNode)
- \`asChild\`: Slot으로 렌더링 (Radix UI)
        `,
      },
    },
  },
};

// ============================================
// Variants
// ============================================

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Primary' },
};

export const Accent: Story = {
  args: { variant: 'accent', size: 'md', children: 'Accent' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', size: 'md', children: 'Neutral' },
};

export const Warning: Story = {
  args: { variant: 'warning', size: 'md', children: 'Warning' },
};

export const Error: Story = {
  args: { variant: 'error', size: 'md', children: 'Error' },
};

export const SecondaryBlue: Story = {
  args: { variant: 'secondaryBlue', size: 'md', children: 'Secondary Blue' },
};

export const SecondaryGray: Story = {
  args: { variant: 'secondaryGray', size: 'md', children: 'Secondary Gray' },
};

export const SecondaryRed: Story = {
  args: { variant: 'secondaryRed', size: 'md', children: 'Secondary Red' },
};

export const GhostBlue: Story = {
  args: { variant: 'ghostBlue', size: 'md', children: 'Ghost Blue' },
};

export const GhostGray: Story = {
  args: { variant: 'ghostGray', size: 'md', children: 'Ghost Gray' },
};

export const GhostRed: Story = {
  args: { variant: 'ghostRed', size: 'md', children: 'Ghost Red' },
};

export const Green: Story = {
  args: { variant: 'green', size: 'md', children: 'Green' },
};

// ============================================
// Sizes
// ============================================

export const SizeSm: Story = {
  name: 'Size: sm',
  args: { variant: 'primary', size: 'sm', children: 'Small' },
};

export const SizeBase: Story = {
  name: 'Size: base',
  args: { variant: 'primary', size: 'base', children: 'Base' },
};

export const SizeMd: Story = {
  name: 'Size: md',
  args: { variant: 'primary', size: 'md', children: 'Medium' },
};

export const SizeLg: Story = {
  name: 'Size: lg',
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

export const SizeIcon: Story = {
  name: 'Size: icon',
  args: { variant: 'primary', size: 'icon', children: '✓' },
};

// ============================================
// States
// ============================================

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Disabled', disabled: true },
};
