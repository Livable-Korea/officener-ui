import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import * as React from 'react';
import { Button } from '../src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../src/components/ui/dialog';
import { Input } from '../src/components/ui/input';
import { Dropdown } from '../src/components/ui/dropdown';

// ============================================
// Dialog Meta
// ============================================

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Dialog - Default
// ============================================

export const Default: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>다이얼로그 열기</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>기본 다이얼로그</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            <DialogDescription>
              다이얼로그 내용입니다. 여기에 원하는 내용을 넣을 수 있습니다.
            </DialogDescription>
          </div>
          <DialogFooter>
            <Button variant="secondaryGray">취소</Button>
            <Button>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// ============================================
// Dialog - Without Close Button
// ============================================

export const WithoutCloseButton: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>닫기 버튼 없음</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader close={false}>
            <DialogTitle>닫기 버튼 없음</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            <DialogDescription>
              DialogHeader의 close prop을 false로 설정하면 닫기 버튼이 숨겨집니다.
            </DialogDescription>
          </div>
          <DialogFooter>
            <Button>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// ============================================
// Dialog - With Required
// ============================================

export const WithRequired: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>필수 표시</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader required>
            <DialogTitle>필수 입력 폼</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-6 pt-0">
            <div>
              <label className="text-sm font-medium text-gray-700">
                이름 <span className="text-blue-500">*</span>
              </label>
              <Input placeholder="이름을 입력하세요" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                이메일 <span className="text-blue-500">*</span>
              </label>
              <Input placeholder="이메일을 입력하세요" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondaryGray">취소</Button>
            <Button>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// ============================================
// Dialog - With Dropdown (Portal Test)
// ============================================

export const WithDropdown: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    const data = [
      { value: '1', label: '옵션 1' },
      { value: '2', label: '옵션 2' },
      { value: '3', label: '옵션 3' },
      { value: '4', label: '옵션 4' },
      { value: '5', label: '옵션 5' },
    ];

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Dropdown 포함</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Dropdown 테스트</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-6 pt-0">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                옵션 선택
              </label>
              <Dropdown
                value={value}
                setValue={setValue}
                data={data}
                placeholder="선택하세요"
                isSearch
              />
            </div>
            <DialogDescription>
              Dialog 내에서 Dropdown이 정상 동작하는지 확인합니다. 스크롤과 선택이
              제대로 되어야 합니다.
            </DialogDescription>
          </div>
          <DialogFooter>
            <Button variant="secondaryGray">취소</Button>
            <Button>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// ============================================
// Dialog - Form Example
// ============================================

export const FormExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState('');

    const categories = [
      { value: 'meeting', label: '회의' },
      { value: 'workshop', label: '워크샵' },
      { value: 'seminar', label: '세미나' },
      { value: 'interview', label: '면접' },
    ];

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>예약 생성</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader required>
            <DialogTitle>회의실 예약</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-6 pt-0">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                예약 제목 <span className="text-blue-500">*</span>
              </label>
              <Input placeholder="예약 제목을 입력하세요" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                카테고리 <span className="text-blue-500">*</span>
              </label>
              <Dropdown
                value={category}
                setValue={setCategory}
                data={categories}
                placeholder="카테고리 선택"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                참석자
              </label>
              <Input placeholder="참석자를 입력하세요" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondaryGray" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>예약</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

// ============================================
// Dialog - Sizes
// ============================================

export const Sizes: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Small (max-w-sm)</Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Small Dialog</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0">
              <DialogDescription>작은 사이즈의 다이얼로그입니다.</DialogDescription>
            </div>
            <DialogFooter>
              <Button>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Medium (max-w-md)</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Medium Dialog</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0">
              <DialogDescription>중간 사이즈의 다이얼로그입니다.</DialogDescription>
            </div>
            <DialogFooter>
              <Button>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Large (max-w-lg)</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Large Dialog</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0">
              <DialogDescription>큰 사이즈의 다이얼로그입니다.</DialogDescription>
            </div>
            <DialogFooter>
              <Button>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
