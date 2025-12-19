import React from 'react';
import '../src/global.css';
import type { Preview } from '@storybook/react';
import {
  Title,
  Description,
  Primary,
  Controls,
  Stories,
  Markdown,
  useOf,
} from '@storybook/blocks';

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
