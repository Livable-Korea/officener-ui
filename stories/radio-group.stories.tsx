import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '../src/components/ui/radio-group';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default
// ============================================

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <label htmlFor="option-1" className="text-sm">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <label htmlFor="option-2" className="text-sm">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <label htmlFor="option-3" className="text-sm">
          Option 3
        </label>
      </div>
    </RadioGroup>
  ),
};

// ============================================
// Error State
// ============================================

export const ErrorState: Story = {
  render: () => (
    <RadioGroup defaultValue="error-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="error-1" id="error-1" error />
        <label htmlFor="error-1" className="text-sm text-red-500">
          Error Option 1
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="error-2" id="error-2" error />
        <label htmlFor="error-2" className="text-sm text-red-500">
          Error Option 2
        </label>
      </div>
    </RadioGroup>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="disabled-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="disabled-1" id="disabled-1" disabled />
        <label htmlFor="disabled-1" className="text-sm text-gray-400">
          Disabled Selected
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="disabled-2" id="disabled-2" disabled />
        <label htmlFor="disabled-2" className="text-sm text-gray-400">
          Disabled Unselected
        </label>
      </div>
    </RadioGroup>
  ),
};

// ============================================
// Horizontal Layout
// ============================================

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="h-1" className="flex flex-row gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="h-1" id="h-1" />
        <label htmlFor="h-1" className="text-sm">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="h-2" id="h-2" />
        <label htmlFor="h-2" className="text-sm">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="h-3" id="h-3" />
        <label htmlFor="h-3" className="text-sm">
          Option 3
        </label>
      </div>
    </RadioGroup>
  ),
};

// ============================================
// Card Style
// ============================================

export const CardStyle: Story = {
  render: () => {
    const [value, setValue] = React.useState('card-1');

    return (
      <RadioGroup value={value} onValueChange={setValue} className="gap-3">
        {[
          { id: 'card-1', title: '기본 플랜', desc: '월 10,000원' },
          { id: 'card-2', title: '프로 플랜', desc: '월 30,000원' },
          { id: 'card-3', title: '엔터프라이즈', desc: '문의' },
        ].map((item) => (
          <label
            key={item.id}
            htmlFor={item.id}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
              value === item.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <RadioGroupItem value={item.id} id={item.id} />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </label>
        ))}
      </RadioGroup>
    );
  },
};
