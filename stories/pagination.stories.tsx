import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Pagination,
  PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../src/components/ui/pagination';

// ============================================
// PaginationComponent Meta
// ============================================

const meta = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    totalCount: {
      control: 'number',
      description: '전체 아이템 수',
    },
    currentPage: {
      control: 'number',
      description: '현재 페이지 (1부터 시작)',
    },
    pageSize: {
      control: 'number',
      description: '페이지당 아이템 수',
    },
    pageRange: {
      control: 'number',
      description: '표시할 페이지 버튼 수',
    },
    variant: {
      control: 'select',
      options: ['default', 'circle'],
      description: '스타일 variant',
    },
    showTotalText: {
      control: 'boolean',
      description: '총 결과 수 텍스트 표시',
    },
  },
} satisfies Meta<typeof PaginationComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default (PaginationComponent)
// ============================================

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <PaginationComponent
        totalCount={100}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

// ============================================
// With Total Text
// ============================================

export const WithTotalText: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <PaginationComponent
        totalCount={123}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        showTotalText
      />
    );
  },
};

// ============================================
// Circle Variant
// ============================================

export const Circle: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <PaginationComponent
        totalCount={100}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        variant="circle"
      />
    );
  },
};

// ============================================
// First Page
// ============================================

export const FirstPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <PaginationComponent
        totalCount={50}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

// ============================================
// Last Page
// ============================================

export const LastPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);

    return (
      <PaginationComponent
        totalCount={50}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

// ============================================
// One Page
// ============================================

export const OnePage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <PaginationComponent
        totalCount={5}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};

// ============================================
// Custom Page Size
// ============================================

export const CustomPageSize: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500">pageSize=20 (100개 / 20 = 5페이지)</p>
        <PaginationComponent
          totalCount={100}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={20}
        />
      </div>
    );
  },
};

// ============================================
// All Variants
// ============================================

export const AllVariants: Story = {
  render: () => {
    const [defaultPage, setDefaultPage] = React.useState(3);
    const [circlePage, setCirclePage] = React.useState(3);

    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-4 text-sm font-medium text-gray-700">
            Default Variant
          </h3>
          <PaginationComponent
            totalCount={100}
            currentPage={defaultPage}
            onPageChange={setDefaultPage}
          />
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium text-gray-700">
            Circle Variant
          </h3>
          <PaginationComponent
            totalCount={100}
            currentPage={circlePage}
            onPageChange={setCirclePage}
            variant="circle"
          />
        </div>
      </div>
    );
  },
};

// ============================================
// Primitives Example
// ============================================

export const Primitives: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-sm font-medium text-gray-700">
          Primitive 컴포넌트 직접 사용
        </h3>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious disabled />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};

// ============================================
// States
// ============================================

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Default:</span>
        <PaginationLink>1</PaginationLink>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Active:</span>
        <PaginationLink isActive>1</PaginationLink>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Disabled:</span>
        <PaginationLink disabled>1</PaginationLink>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Ellipsis:</span>
        <PaginationEllipsis />
      </div>
    </div>
  ),
};
