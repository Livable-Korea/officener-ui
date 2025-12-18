import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronDown, Check, Grid } from 'lucide-react';
import {
  GroupButton,
  GroupButtonItem,
} from '../src/components/ui/group-button';

const meta = {
  title: 'Components/GroupButton',
  component: GroupButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Position
Figma에는 Position 속성(Leading, Middle, Trailing, Single)이 있지만, 코드에서는 컨테이너의 \`overflow-hidden\`과 \`rounded-lg\`로 자동 처리됩니다.

### Variant (코드 전용)
Figma에는 Icon 속성(False, Leading, Trailing, Icon only)이 있지만, 코드에서는 패딩 조정을 위해 \`variant\`로 재정의했습니다.

| Code | Figma Icon 속성 | 설명 |
|------|-----------------|------|
| \`default\` | False | 텍스트만 (py-2 px-4) |
| \`icon\` | Icon only=True | 아이콘만 (p-2, 36x36) |
| \`leadingIcon\` | Leading | 좌측 아이콘+텍스트 (py-2 pr-4 pl-3) |
| \`trailingIcon\` | Trailing | 텍스트+우측 아이콘 (py-2 pr-2.5 pl-3) |

### State (Figma State)
| Code | Figma |
|------|-------|
| default | Default |
| hover | Hover |
| active | Focus |
| disabled | Disabled |

### Props
- \`GroupButton\`: 컨테이너, children으로 GroupButtonItem들을 받음
- \`GroupButtonItem\`: 개별 버튼
  - \`variant\`: 패딩 타입 (default | icon | leadingIcon | trailingIcon)
  - \`disabled\`: 비활성화 여부
  - \`children\`: 버튼 내용 (텍스트, 아이콘, 또는 조합)
    `,
  },
} satisfies Meta<typeof GroupButton>;

export default meta;
type Story = StoryObj<typeof GroupButton>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  render: () => (
    <GroupButton>
      <GroupButtonItem>버튼 1</GroupButtonItem>
      <GroupButtonItem>버튼 2</GroupButtonItem>
      <GroupButtonItem>버튼 3</GroupButtonItem>
    </GroupButton>
  ),
};

// ============================================
// With Icon
// ============================================

export const WithIcon: Story = {
  render: () => (
    <GroupButton>
      <GroupButtonItem variant="icon">
        <Grid className="h-5 w-5" />
      </GroupButtonItem>
      <GroupButtonItem variant="icon">
        <Check className="h-5 w-5" />
      </GroupButtonItem>
    </GroupButton>
  ),
};

// ============================================
// Single Button
// ============================================

export const SingleButton: Story = {
  render: () => (
    <GroupButton>
      <GroupButtonItem>단일 버튼</GroupButtonItem>
    </GroupButton>
  ),
};

// ============================================
// Mixed Variants
// ============================================

export const MixedVariants: Story = {
  render: () => (
    <GroupButton>
      <GroupButtonItem variant="leadingIcon">
        <Check className="h-5 w-5 mr-2" />
        선택
      </GroupButtonItem>
      <GroupButtonItem>텍스트만</GroupButtonItem>
      <GroupButtonItem variant="trailingIcon">
        옵션
        <ChevronDown className="h-5 w-5 ml-2" />
      </GroupButtonItem>
    </GroupButton>
  ),
};

// ============================================
// With Disabled
// ============================================

export const WithDisabled: Story = {
  render: () => (
    <GroupButton>
      <GroupButtonItem>활성</GroupButtonItem>
      <GroupButtonItem disabled>비활성</GroupButtonItem>
      <GroupButtonItem>활성</GroupButtonItem>
    </GroupButton>
  ),
};
