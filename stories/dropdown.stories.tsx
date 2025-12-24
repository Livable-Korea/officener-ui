import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Dropdown,
  OptionDropdown,
  InputDropdown,
  MultiDropdown,
} from '../src/components/ui/dropdown';
import { Button } from '../src/components/ui/button';
import { MoreVertical } from 'lucide-react';

// Sample data
const sampleData = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'cherry', label: '체리' },
  { value: 'grape', label: '포도' },
  { value: 'orange', label: '오렌지' },
];

const longData = [
  { value: '1', label: '서울특별시' },
  { value: '2', label: '부산광역시' },
  { value: '3', label: '대구광역시' },
  { value: '4', label: '인천광역시' },
  { value: '5', label: '광주광역시' },
  { value: '6', label: '대전광역시' },
  { value: '7', label: '울산광역시' },
  { value: '8', label: '세종특별자치시' },
  { value: '9', label: '경기도' },
  { value: '10', label: '강원도' },
];

// ============================================
// Dropdown Meta
// ============================================

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base', 'md'],
    },
    isSearch: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Dropdown - Default
// ============================================

export const Default: Story = {
  args: {
    data: sampleData,
    placeholder: '과일 선택',
    size: 'sm',
    isSearch: false,
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState('');

    return <Dropdown {...args} value={value} setValue={setValue} />;
  },
};

// ============================================
// Dropdown - With Search
// ============================================

export const WithSearch: Story = {
  args: {
    data: longData,
    placeholder: '지역 선택',
    size: 'sm',
    isSearch: true,
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState('');

    return <Dropdown {...args} value={value} setValue={setValue} />;
  },
};

// ============================================
// Dropdown - Sizes
// ============================================

export const Sizes: Story = {
  render: () => {
    const [valueSm, setValueSm] = React.useState('');
    const [valueBase, setValueBase] = React.useState('');
    const [valueMd, setValueMd] = React.useState('');

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Small:</span>
          <Dropdown
            size="sm"
            value={valueSm}
            setValue={setValueSm}
            data={sampleData}
            placeholder="Small"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Base:</span>
          <Dropdown
            size="base"
            value={valueBase}
            setValue={setValueBase}
            data={sampleData}
            placeholder="Base"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Medium:</span>
          <Dropdown
            size="md"
            value={valueMd}
            setValue={setValueMd}
            data={sampleData}
            placeholder="Medium"
          />
        </div>
      </div>
    );
  },
};

// ============================================
// Dropdown - Disabled
// ============================================

export const Disabled: Story = {
  args: {
    data: sampleData,
    placeholder: '선택',
    size: 'sm',
    disabled: true,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState('apple');

    return <Dropdown {...args} value={value} setValue={setValue} />;
  },
};

// ============================================
// Dropdown - Error
// ============================================

export const ErrorState: Story = {
  args: {
    data: sampleData,
    placeholder: '에러 상태',
    size: 'sm',
    disabled: false,
    error: true,
  },
  render: (args) => {
    const [value, setValue] = React.useState('');

    return (
      <div className="flex flex-col gap-4">
        <Dropdown {...args} value={value} setValue={setValue} />
        <InputDropdown {...args} value={value} setValue={setValue} />
        <MultiDropdown
          {...args}
          values={value ? [value] : []}
          setValues={(v) => setValue(v[0] || '')}
        />
      </div>
    );
  },
};

// ============================================
// OptionDropdown - Default
// ============================================

export const OptionDefault: Story = {
  render: () => {
    return (
      <OptionDropdown
        data={[
          { label: '수정', onSelect: () => alert('수정') },
          { label: '복사', onSelect: () => alert('복사') },
          { label: '삭제', onSelect: () => alert('삭제'), className: 'text-red-500' },
        ]}
      >
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </OptionDropdown>
    );
  },
};

// ============================================
// OptionDropdown - With Search
// ============================================

export const OptionWithSearch: Story = {
  render: () => {
    return (
      <OptionDropdown
        isSearch
        data={[
          { label: '옵션 1', onSelect: () => alert('옵션 1') },
          { label: '옵션 2', onSelect: () => alert('옵션 2') },
          { label: '옵션 3', onSelect: () => alert('옵션 3') },
          { label: '옵션 4', onSelect: () => alert('옵션 4') },
          { label: '옵션 5', onSelect: () => alert('옵션 5') },
        ]}
      >
        <Button variant="secondaryGray">옵션 선택</Button>
      </OptionDropdown>
    );
  },
};

// ============================================
// InputDropdown - Default
// ============================================

export const InputDefault: Story = {
  args: {
    data: longData,
    placeholder: '지역 검색...',
    size: 'sm',
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = React.useState('');

    return <InputDropdown {...args} value={value} setValue={setValue} />;
  },
};

// ============================================
// InputDropdown - Sizes
// ============================================

export const InputSizes: Story = {
  render: () => {
    const [valueSm, setValueSm] = React.useState('');
    const [valueBase, setValueBase] = React.useState('');
    const [valueMd, setValueMd] = React.useState('');

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Small:</span>
          <InputDropdown
            size="sm"
            value={valueSm}
            setValue={setValueSm}
            data={sampleData}
            placeholder="Small"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Base:</span>
          <InputDropdown
            size="base"
            value={valueBase}
            setValue={setValueBase}
            data={sampleData}
            placeholder="Base"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Medium:</span>
          <InputDropdown
            size="md"
            value={valueMd}
            setValue={setValueMd}
            data={sampleData}
            placeholder="Medium"
          />
        </div>
      </div>
    );
  },
};

// ============================================
// MultiDropdown - Default
// ============================================

export const MultiDefault: Story = {
  args: {
    data: sampleData,
    placeholder: '과일 선택',
    label: '과일',
    size: 'sm',
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [values, setValues] = React.useState<string[]>([]);

    return <MultiDropdown {...args} values={values} setValues={setValues} />;
  },
};

// ============================================
// MultiDropdown - With Add Button
// ============================================

export const MultiWithAddButton: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>(['apple', 'banana']);

    return (
      <MultiDropdown
        values={values}
        setValues={setValues}
        data={sampleData}
        placeholder="과일 선택"
        label="과일"
        showAddButton
        onAddNew={() => alert('추가하기')}
      />
    );
  },
};

// ============================================
// MultiDropdown - Sizes
// ============================================

export const MultiSizes: Story = {
  render: () => {
    const [valuesSm, setValuesSm] = React.useState<string[]>([]);
    const [valuesBase, setValuesBase] = React.useState<string[]>([]);
    const [valuesMd, setValuesMd] = React.useState<string[]>([]);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Small:</span>
          <MultiDropdown
            size="sm"
            values={valuesSm}
            setValues={setValuesSm}
            data={sampleData}
            placeholder="Small"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Base:</span>
          <MultiDropdown
            size="base"
            values={valuesBase}
            setValues={setValuesBase}
            data={sampleData}
            placeholder="Base"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-sm text-gray-500">Medium:</span>
          <MultiDropdown
            size="md"
            values={valuesMd}
            setValues={setValuesMd}
            data={sampleData}
            placeholder="Medium"
          />
        </div>
      </div>
    );
  },
};
