import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../src/components/ui/accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    markdown: `
### 구성 요소
| 컴포넌트 | 역할 |
|---|---|
| \`Accordion\` | 루트 컨테이너 (\`type="single"\` or \`"multiple"\`) |
| \`AccordionItem\` | 개별 섹션 (\`value\` 필수) |
| \`AccordionTrigger\` | 펼침/접힘 토글 버튼 (ChevronDown 자동 포함) |
| \`AccordionContent\` | 본문 — open/close 시 height 애니메이션 |

### Props (Accordion)
- \`type\`: \`'single'\` | \`'multiple'\` — 한 번에 하나만 열지 여러 개 열 수 있는지
- \`collapsible\`: single 타입일 때 모두 접기 허용 여부

### 사용 예시
\`\`\`tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>섹션 제목</AccordionTrigger>
    <AccordionContent>내용</AccordionContent>
  </AccordionItem>
</Accordion>
\`\`\`
    `,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Single
// ============================================

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-[480px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>오피스너는 어떤 서비스인가요?</AccordionTrigger>
        <AccordionContent>
          지식산업센터 입주사와 건물 관리자를 연결하는 빌딩 관리 플랫폼입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>주요 기능은 무엇인가요?</AccordionTrigger>
        <AccordionContent>
          방문자 예약, 시설 예약, 공지, 전자투표 등 빌딩 운영에 필요한 핵심
          기능을 제공합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>디자인 시스템은 어떻게 공유되나요?</AccordionTrigger>
        <AccordionContent>
          <code>@officener-dev/ui</code> 패키지로 모든 프런트엔드 프로젝트에서
          공통 사용합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// ============================================
// Multiple (동시에 여러 개 열기 가능)
// ============================================

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <Accordion {...args} className="w-[480px]">
      <AccordionItem value="a">
        <AccordionTrigger>첫 번째 섹션</AccordionTrigger>
        <AccordionContent>열린 상태 유지.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>두 번째 섹션</AccordionTrigger>
        <AccordionContent>다른 섹션과 독립적으로 동작.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>세 번째 섹션</AccordionTrigger>
        <AccordionContent>여러 개 동시에 열 수 있음.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
