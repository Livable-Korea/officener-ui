import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
      utils: './src/lib/utils.ts',
      button: './src/components/ui/button.tsx',
      badge: './src/components/ui/badge.tsx',
      'group-button': './src/components/ui/group-button.tsx',
      checkbox: './src/components/ui/checkbox.tsx',
      chip: './src/components/ui/chip.tsx',
      input: './src/components/ui/input.tsx',
      'radio-group': './src/components/ui/radio-group.tsx',
      breadcrumb: './src/components/ui/breadcrumb.tsx',
      heading: './src/components/ui/heading.tsx',
      popover: './src/components/ui/popover.tsx',
      'alert-dialog': './src/components/ui/alert-dialog.tsx',
      dialog: './src/components/ui/dialog.tsx',
      command: './src/components/ui/command.tsx',
      dropdown: './src/components/ui/dropdown.tsx',
      tabs: './src/components/ui/tabs.tsx',
      toggle: './src/components/ui/toggle.tsx',
      pagination: './src/components/ui/pagination.tsx',
      steps: './src/components/ui/steps.tsx',
      calendar: './src/components/ui/calendar.tsx',
      'date-picker': './src/components/ui/date-picker.tsx',
      sheet: './src/components/ui/sheet.tsx',
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
