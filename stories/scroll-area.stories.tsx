import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { ScrollArea, ScrollBar } from '../src/components/ui/scroll-area';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### 구성 요소
| 컴포넌트 | 역할 |
|---|---|
| \`ScrollArea\` | 스크롤 컨테이너 루트 (Viewport 포함) |
| \`ScrollBar\` | 가로/세로 스크롤바 (orientation으로 지정) |

### Props (ScrollBar)
- \`orientation\`: \`'vertical'\` (기본) | \`'horizontal'\`

### 사용 팁
- \`ScrollArea\`에 **고정 높이/너비**를 지정해야 스크롤이 활성화됩니다.
- 가로 스크롤이 필요하면 \`ScrollBar orientation="horizontal"\`를 추가로 배치하세요.
    `,
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = Array.from({ length: 40 }, (_, i) => `태그 ${i + 1}`);

// ============================================
// Vertical
// ============================================

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-60 w-60 rounded-md border border-gray-200">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium text-gray-700">태그 목록</h4>
        <div className="flex flex-col gap-2">
          {TAGS.map((tag) => (
            <div key={tag} className="text-sm text-gray-700">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

// ============================================
// Horizontal
// ============================================

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 whitespace-nowrap rounded-md border border-gray-200">
      <div className="flex gap-2 p-3">
        {TAGS.slice(0, 20).map((tag) => (
          <div
            key={tag}
            className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            {tag}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
