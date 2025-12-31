import React from 'react';
import '../src/global.css';
import {
  Controls,
  Description,
  Markdown,
  Primary,
  Stories,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks';
import type { Preview } from 'storybook-react-rsbuild';

const DocsPage = () => {
  const resolvedOf = useOf('meta');
  const markdown =
    resolvedOf.type === 'meta'
      ? resolvedOf.preparedMeta?.parameters?.markdown
      : undefined;

  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
      {markdown && <Markdown>{markdown}</Markdown>}
      <Stories />
    </>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: DocsPage,
    },
  },
};

export default preview;
