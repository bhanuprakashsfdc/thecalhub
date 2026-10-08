import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const REACT_PACKAGES = new Set([
  'react',
  'react-dom',
  'scheduler',
  'react-is',
  'react-router',
  'react-router-dom',
  'react-helmet-async',
]);

const CHART_PACKAGES = new Set([
  'recharts',
  'victory-vendor',
  '@reduxjs/toolkit',
  'react-redux',
  'reselect',
  'immer',
  'decimal.js-light',
  'es-toolkit',
  'eventemitter3',
  'tiny-invariant',
  'use-sync-external-store',
]);

const MOTION_PACKAGES = new Set([
  'motion',
  'framer-motion',
  'motion-dom',
  'motion-utils',
  '@emotion/is-prop-valid',
]);

function packageNameFromId(id: string): string | null {
  const match = id.match(/[\\/]node_modules[\\/]((?:@[^\\/]+[\\/])?[^\\/]+)/);
  if (!match) return null;
  return match[1].replace(/\\/g, '/');
}

const SHARED_EAGER_PACKAGES = new Set(['clsx', 'tailwind-merge', 'tslib']);

function manualChunks(id: string): string | undefined {
  const pkg = packageNameFromId(id);
  if (!pkg) return undefined;
  if (REACT_PACKAGES.has(pkg) || SHARED_EAGER_PACKAGES.has(pkg)) return 'vendor-react';
  if (CHART_PACKAGES.has(pkg) || pkg.startsWith('d3-')) return 'vendor-charts';
  if (MOTION_PACKAGES.has(pkg)) return 'vendor-motion';
  if (pkg === 'lucide-react') return 'vendor-icons';
  return undefined;
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks,
        },
      },
    },
  };
});
