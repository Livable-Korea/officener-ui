import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import * as React from 'react';
import {
  StepConnector,
  StepItem,
  Steps,
  StepsComponent,
} from '../src/components/ui/steps';

const meta = {
  title: 'Components/Steps',
  component: StepsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: '현재 활성 스텝 (1부터 시작)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '사이즈',
    },
    showNumbers: {
      control: 'boolean',
      description: '스텝 번호 표시 여부',
    },
    showIcon: {
      control: 'boolean',
      description: 'complete 상태에서 체크 아이콘 표시',
    },
  },
} satisfies Meta<typeof StepsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleSteps = [
  { label: '정보입력' },
  { label: '인증하기' },
  { label: '완료' },
];

const voteSteps = [
  { label: '투표대상 선택' },
  { label: '투표기간 설정' },
  { label: '투표발송' },
];

// ============================================
// Default (StepsComponent)
// ============================================

export const Default: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    size: 'md',
    showNumbers: true,
    showIcon: true,
  },
};

// ============================================
// Interactive
// ============================================

export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="flex flex-col items-center gap-8">
        <StepsComponent
          steps={sampleSteps}
          currentStep={currentStep}
          size="md"
        />
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 text-sm"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          >
            이전
          </button>
          <button
            type="button"
            className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
            onClick={() =>
              setCurrentStep((prev) => Math.min(sampleSteps.length, prev + 1))
            }
          >
            다음
          </button>
        </div>
        <p className="text-sm text-gray-500">현재 스텝: {currentStep}</p>
      </div>
    );
  },
};

// ============================================
// All Steps
// ============================================

export const AllSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-sm font-medium text-gray-700">Step 1 (시작)</p>
        <StepsComponent steps={sampleSteps} currentStep={1} />
      </div>
      <div>
        <p className="mb-4 text-sm font-medium text-gray-700">Step 2 (진행중)</p>
        <StepsComponent steps={sampleSteps} currentStep={2} />
      </div>
      <div>
        <p className="mb-4 text-sm font-medium text-gray-700">Step 3 (완료)</p>
        <StepsComponent steps={sampleSteps} currentStep={3} />
      </div>
    </div>
  ),
};

// ============================================
// Sizes
// ============================================

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-sm font-medium text-gray-700">Medium (md)</p>
        <StepsComponent steps={sampleSteps} currentStep={2} size="md" />
      </div>
      <div>
        <p className="mb-4 text-sm font-medium text-gray-700">Small (sm)</p>
        <StepsComponent steps={sampleSteps} currentStep={2} size="sm" />
      </div>
    </div>
  ),
};

// ============================================
// Vote Steps Example
// ============================================

export const VoteSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-[728px] rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <StepsComponent steps={voteSteps} currentStep={currentStep} />
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            className="rounded border border-gray-300 px-4 py-2 text-sm"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            이전
          </button>
          <button
            type="button"
            className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
            onClick={() =>
              setCurrentStep((prev) => Math.min(voteSteps.length, prev + 1))
            }
            disabled={currentStep === voteSteps.length}
          >
            다음
          </button>
        </div>
      </div>
    );
  },
};

// ============================================
// Without Numbers
// ============================================

export const WithoutNumbers: Story = {
  render: () => (
    <StepsComponent
      steps={sampleSteps}
      currentStep={2}
      showNumbers={false}
    />
  ),
};

// ============================================
// Primitives Example
// ============================================

export const Primitives: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-sm font-medium text-gray-700">
          Primitive 컴포넌트 직접 사용
        </p>
        <Steps>
          <StepItem status="complete" stepNumber={1} label="완료됨" />
          <StepConnector status="complete" />
          <StepItem status="current" stepNumber={2} label="진행중" />
          <StepConnector status="incomplete" />
          <StepItem status="incomplete" stepNumber={3} label="대기중" />
        </Steps>
      </div>
    </div>
  ),
};

// ============================================
// Individual States
// ============================================

export const IndividualStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Incomplete:</span>
        <StepItem status="incomplete" stepNumber={1} label="대기중" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Current:</span>
        <StepItem status="current" stepNumber={2} label="진행중" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Complete:</span>
        <StepItem status="complete" stepNumber={3} label="완료됨" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-24 text-sm text-gray-500">Connector:</span>
        <div className="flex items-center gap-2">
          <StepConnector status="complete" />
          <span className="text-xs text-gray-400">complete</span>
          <StepConnector status="incomplete" />
          <span className="text-xs text-gray-400">incomplete</span>
        </div>
      </div>
    </div>
  ),
};
