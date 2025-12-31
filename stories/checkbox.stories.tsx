import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import React from 'react';
import { Checkbox } from '../src/components/ui/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Props
- \`checked\`: boolean | 'indeterminate' - 체크 상태
- \`disabled\`: boolean - 비활성화
- \`error\`: boolean - 에러 상태 (border-red-500)
- \`onCheckedChange\`: (checked: boolean | 'indeterminate') => void
    `,
  },
  argTypes: {
    checked: {
      control: { type: 'select' },
      options: [true, false, 'indeterminate'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  args: {
    checked: false,
  },
};

// ============================================
// Checked
// ============================================

export const Checked: Story = {
  args: {
    checked: true,
  },
};

// ============================================
// Indeterminate
// ============================================

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

// ============================================
// With Label
// ============================================

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        이용약관에 동의합니다
      </label>
    </div>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox disabled />
        <label className="text-sm text-gray-500">Unchecked + Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked disabled />
        <label className="text-sm text-gray-500">Checked + Disabled</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked="indeterminate" disabled />
        <label className="text-sm text-gray-500">
          Indeterminate + Disabled
        </label>
      </div>
    </div>
  ),
};

// ============================================
// Error
// ============================================

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox error />
        <label className="text-sm text-red-500">필수 항목입니다</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked error />
        <label className="text-sm">Checked + Error</label>
      </div>
    </div>
  ),
};

// ============================================
// All States
// ============================================

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 items-center">
      {/* Header */}
      <div className="text-sm font-medium text-gray-500">State</div>
      <div className="text-sm font-medium text-gray-500">Unchecked</div>
      <div className="text-sm font-medium text-gray-500">Checked</div>
      <div className="text-sm font-medium text-gray-500">Indeterminate</div>

      {/* Default */}
      <div className="text-sm">Default</div>
      <Checkbox />
      <Checkbox checked />
      <Checkbox checked="indeterminate" />

      {/* Disabled */}
      <div className="text-sm">Disabled</div>
      <Checkbox disabled />
      <Checkbox checked disabled />
      <Checkbox checked="indeterminate" disabled />

      {/* Error */}
      <div className="text-sm">Error</div>
      <Checkbox error />
      <Checkbox checked error />
      <Checkbox checked="indeterminate" error />
    </div>
  ),
};
