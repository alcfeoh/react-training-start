import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the React training end-to-end lab.
 *
 * Two servers are started automatically before the tests run:
 *  - the license plate API (npm run server) on port 8000
 *  - the React dev server (npm start) on port 3000
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'html' : 'list',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Uncomment to run the same tests in other browsers:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  webServer: [
    {
      command: 'npm run server',
      url: 'http://localhost:8000/data',
      reuseExistingServer: !process.env.CI,
      timeout: 60 * 1000,
    },
    {
      command: 'npm start',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      env: { BROWSER: 'none' },
    },
  ],
});
