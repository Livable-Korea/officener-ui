import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Skeleton } from '../src/components/ui/skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Props
- \`className\`: 크기/모양 커스터마이징 (기본 \`animate-pulse rounded-md bg-gray-100\`)
- \`...HTMLAttributes\`: div 기본 속성 전달

### 사용 예시
\`\`\`tsx
<Skeleton className="h-4 w-40" />
<Skeleton className="h-10 w-10 rounded-full" />
\`\`\`
    `,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Line (text placeholder)
// ============================================

export const Line: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  ),
};

// ============================================
// Avatar + Content
// ============================================

export const AvatarWithContent: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
};

// ============================================
// Card
// ============================================

export const Card: Story = {
  render: () => (
    <div className="w-60 rounded-lg border border-gray-200 p-4">
      <Skeleton className="mb-3 h-32 w-full" />
      <Skeleton className="mb-2 h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  ),
};
