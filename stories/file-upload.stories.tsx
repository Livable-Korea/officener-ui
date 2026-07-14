import React from 'react';
import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { FileUpload } from '../src/components/ui/file-upload';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Props
- \`onFileSelect\`: (file: File) => void — 파일 선택/드롭 시 호출되는 콜백
- \`accept\`: 프리셋 / 확장자 / MIME 타입 (또는 그 배열) — 브라우저 측 파일 필터
- \`buttonLabel\`: string — 가운데 배지 텍스트 (default: "파일업로드")
- \`dragText\`: string — 배지 옆 안내 텍스트 (default: "또는 파일을 여기로 드래그하세요")
- \`hint\`: string — 하단 부설명 (default: 없음)
- \`disabled\`: boolean — 비활성
- \`error\`: string — 에러 메시지. 값이 있으면 테두리를 빨간색으로 표시하고 하단에 메시지를 노출

### accept 타입
세 가지 형태를 자유롭게 조합할 수 있습니다.

| 형태 | 예시 | 설명 |
| --- | --- | --- |
| 프리셋 | \`'image'\`, \`'pdf'\`, \`'excel'\`, \`'word'\`, \`'ppt'\`, \`'csv'\`, \`'document'\` | 자주 쓰는 파일군 |
| 확장자 | \`'.png'\`, \`'.zip'\` | 점으로 시작하는 문자열 |
| MIME 타입 | \`'image/*'\`, \`'image/png'\` | \`type/subtype\` 형식 |

여러 개를 동시에 허용하려면 배열로 전달합니다. 예) \`accept={['pdf', 'word']}\` 또는 \`accept={['.png', '.jpg']}\`.

### 주의
- 검증(사이즈/확장자)은 소비자 책임 — 도메인별 정책이 달라 의도적으로 컴포넌트에 박지 않음.
- 같은 파일을 연속 선택해도 \`onFileSelect\`가 발화하도록 내부에서 input value를 매번 리셋합니다.
- \`accept\`는 브라우저 다이얼로그의 힌트일 뿐 보안 필터가 아닙니다(우회 가능). 실제 검증은 별도로 수행해야 합니다.
    `,
  },
  argTypes: {
    accept: {
      description:
        '체크한 값들은 항상 배열로 전달됩니다(체크 1개 → 길이 1인 배열). 컴포넌트는 단일 값과 배열 모두 동일하게 처리합니다.',
      table: {
        type: {
          summary:
            "'image' | 'pdf' | 'excel' | 'word' | 'ppt' | 'csv' | 'document' | '.png' | '.jpg' | '.webp' | '.zip'",
        },
      },
      control: { type: 'check' },
      options: [
        'image',
        'pdf',
        'excel',
        'word',
        'ppt',
        'csv',
        'document',
        '.png',
        '.jpg',
        '.webp',
        '.zip',
      ],
    },
    buttonLabel: { control: 'text' },
    dragText: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof FileUpload>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  args: {
    onFileSelect: (file) => console.log('selected', file.name),
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Preset - excel
// ============================================

export const PresetExcel: Story = {
  args: {
    accept: 'excel',
    hint: '50MB, 최대 1개 (excel만 가능)',
    onFileSelect: (file) => console.log('selected', file.name),
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Preset - image
// ============================================

export const PresetImage: Story = {
  args: {
    accept: 'image',
    buttonLabel: '이미지 선택',
    dragText: '또는 이미지를 끌어다 놓으세요',
    hint: 'PNG, JPG / 10MB 이하',
    onFileSelect: (file) => console.log('selected', file.name),
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Multiple presets (pdf + word)
// ============================================

export const MultiplePresets: Story = {
  args: {
    accept: ['pdf', 'word'],
    hint: 'PDF, DOC, DOCX 만 가능',
    onFileSelect: (file) => console.log('selected', file.name),
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Custom extensions
// ============================================

export const CustomExtensions: Story = {
  args: {
    accept: ['.png', '.jpg', '.webp'],
    hint: '이미지 확장자 직접 지정',
    onFileSelect: (file) => console.log('selected', file.name),
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// Disabled
// ============================================

export const Disabled: Story = {
  args: {
    disabled: true,
    accept: 'excel',
    hint: '50MB, 최대 1개 (excel만 가능)',
    onFileSelect: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};

// ============================================
// With error
// ============================================

export const WithError: Story = {
  args: {
    accept: 'image',
    buttonLabel: '이미지 선택',
    dragText: '또는 이미지를 끌어다 놓으세요',
    hint: 'PNG, JPG / 10MB 이하',
    error: '파일을 첨부해주세요.',
    onFileSelect: (file) => console.log('selected', file.name),
  },
  decorators: [
    (Story) => (
      <div className="w-[440px]">
        <Story />
      </div>
    ),
  ],
};
