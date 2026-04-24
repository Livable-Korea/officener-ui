import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../src/components/ui/tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### 구성 요소
| 컴포넌트 | 역할 |
|---|---|
| \`TooltipProvider\` | 상위에서 tooltip 그룹의 delay 공유 (앱 루트 또는 섹션 최상단에 한 번 배치) |
| \`Tooltip\` | 개별 tooltip 루트 |
| \`TooltipTrigger\` | 호버/포커스 대상 |
| \`TooltipContent\` | 실제 말풍선 콘텐츠 (Portal 렌더) |

### 사용 예시
\`\`\`tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>버튼</button>
    </TooltipTrigger>
    <TooltipContent>도움말 텍스트</TooltipContent>
  </Tooltip>
</TooltipProvider>
\`\`\`

### 팁
- \`TooltipTrigger\`에 \`asChild\`를 전달하면 자식 요소가 트리거 역할을 대신함.
- 위치는 \`TooltipContent\`의 \`side\` ('top' | 'right' | 'bottom' | 'left') 및 \`sideOffset\`(기본 4)으로 조절.
    `,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-600"
          >
            hover me
          </button>
        </TooltipTrigger>
        <TooltipContent>기본 tooltip 입니다.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

// ============================================
// Sides
// ============================================

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-600"
              >
                {side}
              </button>
            </TooltipTrigger>
            <TooltipContent side={side}>side: {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};
