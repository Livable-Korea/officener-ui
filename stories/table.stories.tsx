import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../src/components/ui/table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    markdown: `
### 구성 요소
| 컴포넌트 | HTML 태그 | 역할 |
|---|---|---|
| \`Table\` | \`table\` | 루트 (overflow-auto 래퍼 포함) |
| \`TableHeader\` | \`thead\` | 헤더 영역 |
| \`TableBody\` | \`tbody\` | 본문 영역 |
| \`TableFooter\` | \`tfoot\` | 푸터 영역 |
| \`TableRow\` | \`tr\` | 행 (hover/selected 상태 지원) |
| \`TableHead\` | \`th\` | 헤더 셀 |
| \`TableCell\` | \`td\` | 본문 셀 |
| \`TableCaption\` | \`caption\` | 캡션 (테이블 하단) |

### Props
- 각 컴포넌트는 대응 HTML 요소의 표준 속성을 모두 전달받음
- \`TableRow\`의 \`data-state="selected"\` 속성으로 선택 상태 표시 가능
    `,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Invoice {
  invoice: string;
  status: string;
  method: string;
  amount: string;
}

const invoices: Invoice[] = [
  {
    invoice: 'INV001',
    status: '결제완료',
    method: '카드',
    amount: '₩250,000',
  },
  {
    invoice: 'INV002',
    status: '대기',
    method: '계좌이체',
    amount: '₩150,000',
  },
  {
    invoice: 'INV003',
    status: '결제완료',
    method: '카드',
    amount: '₩350,000',
  },
  {
    invoice: 'INV004',
    status: '환불',
    method: '카드',
    amount: '₩450,000',
  },
];

// ============================================
// Overview
// ============================================

export const Overview: Story = {
  render: () => (
    <Table>
      <TableCaption>최근 결제 내역</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">인보이스</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>결제 수단</TableHead>
          <TableHead className="text-right">금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((row) => (
          <TableRow key={row.invoice}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>합계</TableCell>
          <TableCell className="text-right">₩1,200,000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// ============================================
// Selected Row
// ============================================

export const SelectedRow: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>김관리</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>이입주</TableCell>
          <TableCell>입주사</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>박방문</TableCell>
          <TableCell>방문자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
