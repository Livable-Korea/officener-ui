import type { Meta, StoryObj } from '@storybook/react';
import { Plus, X } from 'lucide-react';
import * as React from 'react';
import { Chip } from '../src/components/ui/chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Badge vs Chip

- **Badge**: 상태 표시용 (읽기 전용)
- **Chip**: 상호작용용 (클릭, 선택, 제거)
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    theme: {
      control: 'select',
      options: ['default', 'orange', 'indigo', 'blue', 'green'],
    },
    dashed: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default
// ============================================

export const Default: Story = {
  args: {
    children: 'Chip',
    size: 'sm',
    theme: 'default',
  },
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
    </div>
  ),
};

// ============================================
// Themes
// ============================================

export const Themes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip theme="default">Default</Chip>
      <Chip theme="orange">Orange</Chip>
      <Chip theme="indigo">Indigo</Chip>
      <Chip theme="blue">Blue</Chip>
      <Chip theme="green">Green</Chip>
    </div>
  ),
};

// ============================================
// With Icons
// ============================================

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip theme="blue">
        <span>Tag</span>
        <X className="size-3" />
      </Chip>
      <Chip theme="green" size="md">
        <Plus className="size-4" />
        <span>Add Tag</span>
      </Chip>
      <Chip theme="orange">
        <span>Removable</span>
        <X className="size-3 cursor-pointer hover:text-orange-700" />
      </Chip>
    </div>
  ),
};

// ============================================
// Dashed (Add Type)
// ============================================

export const Dashed: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip dashed>
        <Plus className="size-3" />
        <span>Add</span>
      </Chip>
      <Chip dashed size="md" theme="blue">
        <Plus className="size-4" />
        <span>Add Tag</span>
      </Chip>
    </div>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip disabled>Disabled</Chip>
      <Chip theme="blue" disabled>
        Blue Disabled
      </Chip>
      <Chip theme="green" disabled>
        Green Disabled
      </Chip>
    </div>
  ),
};

// ============================================
// Clickable
// ============================================

export const Clickable: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => alert('Clicked!')}
      >
        Click me
      </Chip>
      <Chip
        theme="blue"
        className="cursor-pointer hover:bg-blue-100"
        onClick={() => alert('Blue clicked!')}
      >
        Blue Clickable
      </Chip>
    </div>
  ),
};
