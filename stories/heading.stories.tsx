import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  HeadingRoot,
  HeadingBreadcrumb,
  HeadingBadges,
  HeadingContent,
  HeadingTabs,
  HeadingTab,
  HeadingTitle,
  HeadingActions,
  HeadingBottom,
} from '../src/components/ui/heading';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../src/components/ui/breadcrumb';
import { Badge } from '../src/components/ui/badge';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'Components/Heading',
  component: HeadingRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    markdown: `
### Compound Components
| Component | 설명 |
|-----------|------|
| \`Heading.Root\` | Container (bg-white p-6) |
| \`Heading.Breadcrumb\` | Breadcrumb area |
| \`Heading.Badges\` | Badge container |
| \`Heading.Content\` | Title + Actions row |
| \`Heading.Tabs\` | Tab container |
| \`Heading.Tab\` | Tab item (supports asChild) |
| \`Heading.Title\` | Simple title |
| \`Heading.Actions\` | Right-side actions |
| \`Heading.Bottom\` | Bottom content |

### Tab States
| State | 설명 |
|-------|------|
| \`active\` | 현재 탭 (bold, gray-900) |
| \`inactive\` | 비활성 탭 (gray-400, hover effect) |
| \`static\` | 링크 없는 정적 텍스트 |

### asChild Pattern
\`\`\`tsx
// React Router
<Heading.Tab state="active" asChild>
  <Link to="/path">Tab</Link>
</Heading.Tab>

// Next.js
<Heading.Tab state="active" asChild>
  <Link href="/path">Tab</Link>
</Heading.Tab>
\`\`\`
    `,
  },
} satisfies Meta<typeof HeadingRoot>;

export default meta;
type Story = StoryObj<typeof HeadingRoot>;

// ============================================
// Simple Title
// ============================================

export const SimpleTitle: Story = {
  render: () => (
    <HeadingRoot>
      <HeadingContent>
        <HeadingTitle>Simple Page Title</HeadingTitle>
      </HeadingContent>
    </HeadingRoot>
  ),
};

// ============================================
// With Actions
// ============================================

export const WithActions: Story = {
  render: () => (
    <HeadingRoot>
      <HeadingContent>
        <HeadingTitle>Page Title</HeadingTitle>
        <HeadingActions>
          <Button variant="secondaryGray" size="sm">
            Export
          </Button>
          <Button variant="primary" size="sm">
            Add New
          </Button>
        </HeadingActions>
      </HeadingContent>
    </HeadingRoot>
  ),
};

// ============================================
// With Tabs
// ============================================

export const WithTabs: Story = {
  render: () => (
    <HeadingRoot>
      <HeadingContent>
        <HeadingTabs>
          <HeadingTab state="active">
            <a href="#">Active Tab</a>
          </HeadingTab>
          <HeadingTab state="inactive">
            <a href="#">Inactive Tab</a>
          </HeadingTab>
          <HeadingTab state="inactive">
            <a href="#">Another Tab</a>
          </HeadingTab>
        </HeadingTabs>
        <HeadingActions>
          <Button variant="primary" size="sm">
            Action
          </Button>
        </HeadingActions>
      </HeadingContent>
    </HeadingRoot>
  ),
};

// ============================================
// With Breadcrumb
// ============================================

export const WithBreadcrumb: Story = {
  render: () => (
    <HeadingRoot>
      <HeadingBreadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Visitors</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HeadingBreadcrumb>
      <HeadingContent>
        <HeadingTitle>Visitors</HeadingTitle>
      </HeadingContent>
    </HeadingRoot>
  ),
};

// ============================================
// With Badges
// ============================================

export const WithBadges: Story = {
  render: () => (
    <HeadingRoot>
      <HeadingBadges>
        <Badge theme="blue">New</Badge>
        <Badge theme="green">Active</Badge>
      </HeadingBadges>
      <HeadingContent>
        <HeadingTitle>Page with Badges</HeadingTitle>
      </HeadingContent>
    </HeadingRoot>
  ),
};

// ============================================
// Full Example
// ============================================

export const FullExample: Story = {
  render: () => (
    <HeadingRoot>
      <HeadingBreadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Visitors</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </HeadingBreadcrumb>

      <HeadingBadges>
        <Badge theme="blue">New</Badge>
        <Badge theme="green">Active</Badge>
      </HeadingBadges>

      <HeadingContent>
        <HeadingTabs>
          <HeadingTab state="active">Visitor List</HeadingTab>
          <HeadingTab state="inactive">Reservations</HeadingTab>
          <HeadingTab state="inactive">Settings</HeadingTab>
        </HeadingTabs>
        <HeadingActions>
          <Button variant="secondaryGray" size="sm">
            Export
          </Button>
          <Button variant="primary" size="sm">
            Add Visitor
          </Button>
        </HeadingActions>
      </HeadingContent>

      <HeadingBottom>
        <p className="text-sm text-gray-500">Last updated: 2025-01-15</p>
      </HeadingBottom>
    </HeadingRoot>
  ),
};
