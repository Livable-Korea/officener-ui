import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import * as React from 'react';
import { Toggle } from '../src/components/ui/toggle';

// ============================================
// Toggle Meta
// ============================================

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'green', 'black'],
    },
    size: {
      control: 'select',
      options: ['20', '24'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default
// ============================================

export const Default: Story = {
  args: {
    color: 'blue',
    size: '24',
  },
};

// ============================================
// Colors
// ============================================

export const Colors: Story = {
  render: () => {
    const [blueChecked, setBlueChecked] = React.useState(true);
    const [greenChecked, setGreenChecked] = React.useState(true);
    const [blackChecked, setBlackChecked] = React.useState(true);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">Blue:</span>
          <Toggle
            color="blue"
            checked={blueChecked}
            onCheckedChange={setBlueChecked}
          />
          <Toggle color="blue" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">Green:</span>
          <Toggle
            color="green"
            checked={greenChecked}
            onCheckedChange={setGreenChecked}
          />
          <Toggle color="green" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">Black:</span>
          <Toggle
            color="black"
            checked={blackChecked}
            onCheckedChange={setBlackChecked}
          />
          <Toggle color="black" />
        </div>
      </div>
    );
  },
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
  render: () => {
    const [size24, setSize24] = React.useState(true);
    const [size20, setSize20] = React.useState(true);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Size 24:</span>
          <Toggle size="24" checked={size24} onCheckedChange={setSize24} />
          <Toggle size="24" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Size 20:</span>
          <Toggle size="20" checked={size20} onCheckedChange={setSize20} />
          <Toggle size="20" />
        </div>
      </div>
    );
  },
};

// ============================================
// All Variants
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-gray-700">Size 24</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-gray-500">Blue:</span>
            <Toggle color="blue" size="24" defaultChecked />
            <Toggle color="blue" size="24" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-gray-500">Green:</span>
            <Toggle color="green" size="24" defaultChecked />
            <Toggle color="green" size="24" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-gray-500">Black:</span>
            <Toggle color="black" size="24" defaultChecked />
            <Toggle color="black" size="24" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-gray-700">Size 20</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-gray-500">Blue:</span>
            <Toggle color="blue" size="20" defaultChecked />
            <Toggle color="blue" size="20" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-gray-500">Green:</span>
            <Toggle color="green" size="20" defaultChecked />
            <Toggle color="green" size="20" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-gray-500">Black:</span>
            <Toggle color="black" size="20" defaultChecked />
            <Toggle color="black" size="20" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-500">Checked + Disabled:</span>
        <Toggle defaultChecked disabled />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-32 text-sm text-gray-500">
          Unchecked + Disabled:
        </span>
        <Toggle disabled />
      </div>
    </div>
  ),
};

// ============================================
// Controlled
// ============================================

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Toggle checked={checked} onCheckedChange={setChecked} />
          <span className="text-sm text-gray-500">
            {checked ? '활성화됨' : '비활성화됨'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setChecked(!checked)}
          className="w-fit rounded bg-gray-100 px-3 py-1 text-sm"
        >
          토글 전환
        </button>
      </div>
    );
  },
};

// ============================================
// With Label
// ============================================

export const WithLabel: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [autoSave, setAutoSave] = React.useState(true);

    return (
      <div className="flex flex-col gap-4">
        <label className="flex items-center justify-between gap-8">
          <span className="text-sm font-medium text-gray-700">알림 받기</span>
          <Toggle
            checked={notifications}
            onCheckedChange={setNotifications}
            color="blue"
          />
        </label>
        <label className="flex items-center justify-between gap-8">
          <span className="text-sm font-medium text-gray-700">다크 모드</span>
          <Toggle
            checked={darkMode}
            onCheckedChange={setDarkMode}
            color="black"
          />
        </label>
        <label className="flex items-center justify-between gap-8">
          <span className="text-sm font-medium text-gray-700">자동 저장</span>
          <Toggle
            checked={autoSave}
            onCheckedChange={setAutoSave}
            color="green"
          />
        </label>
      </div>
    );
  },
};
