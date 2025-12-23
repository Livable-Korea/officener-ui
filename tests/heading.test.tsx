import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Heading } from '../src/components/ui/heading';

describe('Heading', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders simple title correctly', () => {
    render(
      <Heading.Root>
        <Heading.Content>
          <Heading.Title>Test Title</Heading.Title>
        </Heading.Content>
      </Heading.Root>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders tabs with correct states', () => {
    render(
      <Heading.Root>
        <Heading.Content>
          <Heading.Tabs>
            <Heading.Tab state="active">Active Tab</Heading.Tab>
            <Heading.Tab state="inactive">Inactive Tab</Heading.Tab>
          </Heading.Tabs>
        </Heading.Content>
      </Heading.Root>
    );

    const activeTab = screen.getByText('Active Tab');
    const inactiveTab = screen.getByText('Inactive Tab');

    expect(activeTab).toHaveClass('text-gray-900');
    expect(inactiveTab).toHaveClass('text-gray-400');
  });

  it('HeadingTab supports asChild pattern', () => {
    const CustomLink = ({
      children,
      to,
    }: {
      children: React.ReactNode;
      to: string;
    }) => <a href={to}>{children}</a>;

    render(
      <Heading.Root>
        <Heading.Content>
          <Heading.Tabs>
            <Heading.Tab state="active" asChild>
              <CustomLink to="/test">Link Tab</CustomLink>
            </Heading.Tab>
          </Heading.Tabs>
        </Heading.Content>
      </Heading.Root>
    );

    expect(screen.getByText('Link Tab')).toHaveAttribute('href', '/test');
  });

  it('renders actions on the right side', () => {
    render(
      <Heading.Root>
        <Heading.Content>
          <Heading.Title>Actions Title</Heading.Title>
          <Heading.Actions>
            <button type="button">Action Button</button>
          </Heading.Actions>
        </Heading.Content>
      </Heading.Root>
    );

    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('renders all compound parts correctly', () => {
    render(
      <Heading.Root>
        <Heading.Breadcrumb>
          <span>Breadcrumb Content</span>
        </Heading.Breadcrumb>
        <Heading.Badges>
          <span>Badge Content</span>
        </Heading.Badges>
        <Heading.Content>
          <Heading.Title>Compound Title</Heading.Title>
        </Heading.Content>
        <Heading.Bottom>
          <span>Bottom Content</span>
        </Heading.Bottom>
      </Heading.Root>
    );

    expect(screen.getByText('Breadcrumb Content')).toBeInTheDocument();
    expect(screen.getByText('Badge Content')).toBeInTheDocument();
    expect(screen.getByText('Compound Title')).toBeInTheDocument();
    expect(screen.getByText('Bottom Content')).toBeInTheDocument();
  });

  it('applies custom className to HeadingRoot', () => {
    render(
      <Heading.Root className="custom-class">
        <Heading.Content>
          <Heading.Title>Custom Class Title</Heading.Title>
        </Heading.Content>
      </Heading.Root>
    );

    const root = screen.getByText('Custom Class Title').closest('.custom-class');
    expect(root).toBeInTheDocument();
  });
});
