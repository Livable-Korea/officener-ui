import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { Separator } from '../src/components/ui/separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    markdown: `
### Orientation
| Code | 설명 |
|------|------|
| \`horizontal\` | 수평 구분선 (기본값, h-px w-full) |
| \`vertical\` | 수직 구분선 (h-full w-px, 부모 높이 필요) |

### Props
- \`orientation\`: 방향 (horizontal | vertical)
- \`decorative\`: 장식용 여부. false일 때 role="separator" + aria-orientation 부여
- \`className\`: 색상/두께 커스터마이징 (기본 bg-gray-200)
    `,
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) =>
    args.orientation === 'vertical' ? (
      <div className="flex h-12 items-center gap-3 text-sm text-gray-700">
        <span>좌측</span>
        <Separator {...args} />
        <span>우측</span>
      </div>
    ) : (
      <div className="w-60">
        <div className="text-sm text-gray-700">위 콘텐츠</div>
        <Separator {...args} className="my-3" />
        <div className="text-sm text-gray-700">아래 콘텐츠</div>
      </div>
    ),
};

// ============================================
// Semantic (decorative: false)
// ============================================

export const Semantic: Story = {
  args: {
    orientation: 'horizontal',
    decorative: false,
  },
  render: (args) => (
    <div className="w-60">
      <div className="text-sm text-gray-700">섹션 A</div>
      <Separator {...args} className="my-3" />
      <div className="text-sm text-gray-700">섹션 B</div>
    </div>
  ),
};
