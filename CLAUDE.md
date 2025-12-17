# Officener UI

Officener 서비스의 공용 디자인 컴포넌트 라이브러리입니다.
`officener-frontend`와 `officener-manager-frontend`에서 공통으로 사용하는 UI 컴포넌트들을 관리합니다.

## 디자인 시스템 참고

> **Figma 디자인 시스템**: [🎨 디자인 시스템](https://www.figma.com/design/lHZdfoOBOLyYDtY3lFHpi6/%F0%9F%8E%A8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=21-723&m=dev)

컴포넌트 구현 시 위 피그마 파일의 디자인 스펙을 따릅니다.
- 색상, 타이포그래피, 스페이싱 등 디자인 토큰
- 각 컴포넌트의 variant, size, state 정의
- 반응형 및 접근성 가이드라인

## 기술 스택

- **빌드**: RSLib (ESM 라이브러리 빌드)
- **문서화**: Storybook 8
- **테스트**: Vitest + React Testing Library
- **린터/포맷터**: Biome
- **언어**: TypeScript (Strict)

## 개발 명령어

```bash
npm run dev              # 빌드 watch 모드
npm run storybook        # Storybook 개발 서버
npm run build            # 라이브러리 빌드
npm run build:storybook  # Storybook 정적 빌드
npm run test             # 테스트 실행
npm run format           # 코드 포맷팅
npm run check            # 린트 + 포맷 검사
```

## 파일 구조

```
officener-ui/
├── .storybook/              # Storybook 설정
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── index.tsx            # 라이브러리 진입점 (export)
│   ├── global.css           # 글로벌 스타일 (Tailwind)
│   ├── lib/
│   │   └── utils.ts         # cn() 등 유틸리티 함수
│   └── components/
│       └── ui/              # shadcn 기반 UI 컴포넌트
│           ├── button.tsx
│           ├── input.tsx
│           └── ...
├── stories/                 # Storybook 스토리 파일
│   └── [component].stories.ts
├── tests/                   # 테스트 파일
│   └── [component].test.tsx
├── biome.json               # Biome 설정
├── rslib.config.ts          # RSLib 빌드 설정
└── vitest.config.ts         # Vitest 설정
```

## 컴포넌트 작성 규칙

### 파일 위치

- 컴포넌트: `src/components/ui/[component].tsx`
- 스토리: `stories/[component].stories.ts`
- 테스트: `tests/[component].test.tsx`

### 컴포넌트 템플릿 (shadcn + cva 기반)

```tsx
// src/components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  '기본 스타일 클래스들',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white ...',
        secondary: 'bg-white border ...',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

### Export 규칙

새 컴포넌트 추가 시 `src/index.tsx`에 반드시 export 추가:

```tsx
// src/index.tsx
import './global.css';

// utils
export { cn } from '@/lib/utils';

// components
export { Button, buttonVariants } from '@/components/ui/button';
export type { ButtonProps } from '@/components/ui/button';
```

## 스토리 작성 규칙

```ts
// stories/button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondaryBlue', 'secondaryGray', ...],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'md', 'lg'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

## 테스트 작성 규칙

```tsx
// tests/button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button/button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 네이밍 컨벤션

| 항목             | 규칙                | 예시                  |
| ---------------- | ------------------- | --------------------- |
| 파일명           | kebab-case          | `date-picker.tsx`     |
| 컴포넌트명       | PascalCase          | `DatePicker`          |
| Props 인터페이스 | `[Component]Props`  | `DatePickerProps`     |
| CSS 클래스       | BEM 또는 kebab-case | `date-picker--active` |

## 다른 프로젝트에서 사용

```tsx
// officener-frontend 또는 officener-manager-frontend에서
import { Button, cn } from '@officener/ui';

export default function MyPage() {
  return <Button variant="primary" size="md">저장</Button>;
}
```

> **참고**: 소비하는 프로젝트의 `tailwind.config`에 아래 경로 추가 필요:
> ```js
> content: [
>   './node_modules/@officener/ui/dist/**/*.js',
> ]
> ```
