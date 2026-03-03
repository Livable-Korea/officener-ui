import * as React from "react";
import type { Meta, StoryObj } from "storybook-react-rsbuild";
import { AlertDialog } from "../src/components/ui/alert-dialog";
import { Button } from "../src/components/ui/button";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    buttonType: {
      control: "select",
      options: ["default", "wide"],
    },
    buttonVariant: {
      control: "select",
      options: [
        "primary",
        "error",
        "warning",
        "neutral",
        "accent",
        "secondaryBlue",
        "secondaryGray",
        "secondaryRed",
        "ghostBlue",
        "ghostGray",
        "ghostRed",
        "green",
      ],
    },
    isShowIcon: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    buttonText: {
      control: "text",
    },
    subButtonText: {
      control: "text",
    },
  },
  args: {
    isOpen: false, // render 함수에서 덮어씀 (타입 오류 방지용)
    onOpenChange: () => {},
    title: "알림",
    description: "기본 알림 다이얼로그입니다.",
    buttonText: "확인",
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Default (Controls로 조정 가능)
// ============================================

export const Default: Story = {
  args: {
    title: "알림",
    description: "기본 알림 다이얼로그입니다.",
    buttonText: "확인",
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Alert 열기</Button>
        <AlertDialog {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </>
    );
  },
};
