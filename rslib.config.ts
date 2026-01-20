import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  lib: [
    {
      bundle: true,
      dts: true,
      format: 'esm',
      banner: {
        js: '"use client";',
      },
    },
  ],
  output: {
    target: 'web',
    externals: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'lucide-react',
      'iconsax-react',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'date-fns',
    ],
  },
  plugins: [pluginReact()],
});
