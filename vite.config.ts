import { transformWithOxc } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

/**
 * CRA compiled JSX inside .js files. Vite 8's oxc pipeline infers `lang` from
 * the extension, so keep lab filenames (.js) working without renaming to .jsx.
 */
function jsxInJs() {
  return {
    name: 'jsx-in-js',
    enforce: 'pre' as const,
    async transform(code: string, id: string) {
      const filepath = id.split('?')[0];
      if (filepath.includes('node_modules') || !filepath.endsWith('.js')) {
        return null;
      }
      const result = await transformWithOxc(code, id, {
        lang: 'jsx',
        jsx: { runtime: 'automatic' },
      });
      return { code: result.code, map: result.map };
    },
  };
}

export default defineConfig({
  plugins: [jsxInJs(), react(), checker({ typescript: true })],
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
});
