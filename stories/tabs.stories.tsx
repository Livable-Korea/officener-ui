import type { Meta, StoryObj } from '@storybook/react';
import { Home, Settings, User } from 'lucide-react';
import * as React from 'react';
import { Badge } from '../src/components/ui/badge';
import { TabsComponent } from '../src/components/ui/tabs';

// Sample data
const sampleTabs = [
  { value: 'tab1', label: '첫 번째 탭' },
  { value: 'tab2', label: '두 번째 탭' },
  { value: 'tab3', label: '세 번째 탭' },
];

const tabsWithContent = [
  {
    value: 'tab1',
    label: '개요',
    content: <div className="p-4">첫 번째 탭의 내용입니다.</div>,
  },
  {
    value: 'tab2',
    label: '상세',
    content: <div className="p-4">두 번째 탭의 내용입니다.</div>,
  },
  {
    value: 'tab3',
    label: '설정',
    content: <div className="p-4">세 번째 탭의 내용입니다.</div>,
  },
];

// ============================================
// TabsComponent Meta
// ============================================

const meta = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pill', 'bar'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TabsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default (Underline)
// ============================================

export const Default: Story = {
  args: {
    tabs: tabsWithContent,
    variant: 'underline',
    fullWidth: false,
  },
};

// ============================================
// Pill Variant
// ============================================

export const Pill: Story = {
  args: {
    tabs: tabsWithContent,
    variant: 'pill',
    fullWidth: false,
  },
};

// ============================================
// Bar Variant
// ============================================

export const Bar: Story = {
  args: {
    tabs: tabsWithContent,
    variant: 'bar',
    fullWidth: false,
  },
};

// ============================================
// All Variants
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Underline</h3>
        <TabsComponent tabs={tabsWithContent} variant="underline" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Pill</h3>
        <TabsComponent tabs={tabsWithContent} variant="pill" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">Bar</h3>
        <TabsComponent tabs={tabsWithContent} variant="bar" />
      </div>
    </div>
  ),
};

// ============================================
// Full Width
// ============================================

export const FullWidth: Story = {
  args: {
    tabs: tabsWithContent,
    variant: 'underline',
    fullWidth: true,
  },
};

// ============================================
// Full Width - All Variants
// ============================================

export const FullWidthAllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Underline - Full Width
        </h3>
        <TabsComponent tabs={tabsWithContent} variant="underline" fullWidth />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Pill - Full Width
        </h3>
        <TabsComponent tabs={tabsWithContent} variant="pill" fullWidth />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Bar - Full Width
        </h3>
        <TabsComponent tabs={tabsWithContent} variant="bar" fullWidth />
      </div>
    </div>
  ),
};

// ============================================
// With Icons
// ============================================

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        value: 'home',
        label: '홈',
        icon: <Home className="h-4 w-4" />,
        content: <div className="p-4">홈 화면 내용입니다.</div>,
      },
      {
        value: 'profile',
        label: '프로필',
        icon: <User className="h-4 w-4" />,
        content: <div className="p-4">프로필 화면 내용입니다.</div>,
      },
      {
        value: 'settings',
        label: '설정',
        icon: <Settings className="h-4 w-4" />,
        content: <div className="p-4">설정 화면 내용입니다.</div>,
      },
    ],
    variant: 'underline',
  },
};

// ============================================
// With Badges
// ============================================

export const WithBadges: Story = {
  args: {
    tabs: [
      {
        value: 'all',
        label: '전체',
        badge: (
          <Badge variant="blue" size="sm">
            128
          </Badge>
        ),
        content: <div className="p-4">전체 목록입니다.</div>,
      },
      {
        value: 'pending',
        label: '대기중',
        badge: (
          <Badge variant="orange" size="sm">
            5
          </Badge>
        ),
        content: <div className="p-4">대기중인 항목입니다.</div>,
      },
      {
        value: 'completed',
        label: '완료',
        badge: (
          <Badge variant="green" size="sm">
            123
          </Badge>
        ),
        content: <div className="p-4">완료된 항목입니다.</div>,
      },
    ],
    variant: 'underline',
  },
};

// ============================================
// With Icons and Badges
// ============================================

export const WithIconsAndBadges: Story = {
  args: {
    tabs: [
      {
        value: 'home',
        label: '홈',
        icon: <Home className="h-4 w-4" />,
        badge: (
          <Badge variant="red" size="sm">
            3
          </Badge>
        ),
        content: <div className="p-4">홈 화면 내용입니다.</div>,
      },
      {
        value: 'profile',
        label: '프로필',
        icon: <User className="h-4 w-4" />,
        content: <div className="p-4">프로필 화면 내용입니다.</div>,
      },
      {
        value: 'settings',
        label: '설정',
        icon: <Settings className="h-4 w-4" />,
        badge: (
          <Badge variant="blue" size="sm">
            New
          </Badge>
        ),
        content: <div className="p-4">설정 화면 내용입니다.</div>,
      },
    ],
    variant: 'underline',
  },
};

// ============================================
// With Disabled Tab
// ============================================

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      {
        value: 'tab1',
        label: '활성 탭',
        content: <div className="p-4">활성 탭 내용입니다.</div>,
      },
      {
        value: 'tab2',
        label: '비활성 탭',
        disabled: true,
        content: <div className="p-4">비활성 탭 내용입니다.</div>,
      },
      {
        value: 'tab3',
        label: '다른 활성 탭',
        content: <div className="p-4">다른 활성 탭 내용입니다.</div>,
      },
    ],
    variant: 'underline',
  },
};

// ============================================
// Controlled
// ============================================

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('tab1');

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue('tab1')}
            className="rounded bg-gray-100 px-3 py-1 text-sm"
          >
            Tab 1로 이동
          </button>
          <button
            type="button"
            onClick={() => setValue('tab2')}
            className="rounded bg-gray-100 px-3 py-1 text-sm"
          >
            Tab 2로 이동
          </button>
          <button
            type="button"
            onClick={() => setValue('tab3')}
            className="rounded bg-gray-100 px-3 py-1 text-sm"
          >
            Tab 3로 이동
          </button>
        </div>
        <TabsComponent
          tabs={tabsWithContent}
          value={value}
          onValueChange={setValue}
          variant="underline"
        />
        <p className="text-sm text-gray-500">현재 선택: {value}</p>
      </div>
    );
  },
};

// ============================================
// Without Content (Navigation Only)
// ============================================

export const NavigationOnly: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('tab1');

    return (
      <div className="flex flex-col gap-4">
        <TabsComponent
          tabs={sampleTabs}
          value={activeTab}
          onValueChange={setActiveTab}
          variant="underline"
        />
        <p className="text-sm text-gray-500">선택된 탭: {activeTab}</p>
      </div>
    );
  },
};
