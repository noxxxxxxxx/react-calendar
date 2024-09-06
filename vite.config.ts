/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

const externals = [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime']

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['json', 'html'],
      include: ['src/lib'],
      exclude: ['**/type.ts'],
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      name: 'rc-calendar-picker',
      fileName: 'rc-calendar-picker',
      entry: resolve(__dirname, 'src/lib/index.ts'),
    },
    rollupOptions: {
      external: externals,
      output: {
        globals: {
          'react': 'React',
          'dayjs': 'dayjs',
          'use-immer': 'useImmer',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'JSX',
        },
      },
    },
  },
})
