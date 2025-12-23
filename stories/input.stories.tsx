import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/ui/input';
import { Search, X, Eye, EyeOff } from 'lucide-react';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default
// ============================================

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
    size: 'sm',
  },
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input size="sm" placeholder="Small (sm)" />
      <Input size="base" placeholder="Base" />
      <Input size="md" placeholder="Medium (md)" />
      <Input size="lg" placeholder="Large (lg)" />
    </div>
  ),
};

// ============================================
// Variants
// ============================================

export const Variants: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input variant="default" placeholder="Default" />
      <Input variant="error" placeholder="Error" />
      <Input variant="success" placeholder="Success" />
    </div>
  ),
};

// ============================================
// With Left Element
// ============================================

export const WithLeftElement: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input
        leftElement={<Search className="size-4" />}
        placeholder="검색어를 입력하세요"
      />
    </div>
  ),
};

// ============================================
// With Right Element
// ============================================

export const WithRightElement: Story = {
  render: () => {
    const [value, setValue] = React.useState('삭제 가능한 텍스트');

    return (
      <div className="flex w-[300px] flex-col gap-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rightElement={
            value && (
              <button
                type="button"
                onClick={() => setValue('')}
                className="hover:text-gray-600"
              >
                <X className="size-4" />
              </button>
            )
          }
          placeholder="입력 후 X 버튼으로 삭제"
        />
      </div>
    );
  },
};

// ============================================
// Password Input
// ============================================

export const PasswordInput: Story = {
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="flex w-[300px] flex-col gap-4">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />
      </div>
    );
  },
};

// ============================================
// Error State
// ============================================

export const ErrorState: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input error placeholder="에러 상태" />
      <Input error defaultValue="잘못된 입력값" />
    </div>
  ),
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input disabled placeholder="비활성화" />
      <Input disabled defaultValue="비활성화된 값" />
      <Input
        disabled
        leftElement={<Search className="size-4" />}
        placeholder="아이콘과 함께"
      />
    </div>
  ),
};

// ============================================
// Combined
// ============================================

export const Combined: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input
        size="md"
        leftElement={<Search className="size-5" />}
        rightElement={
          <button type="button" className="hover:text-gray-600">
            <X className="size-5" />
          </button>
        }
        placeholder="검색어 입력"
      />
    </div>
  ),
};
