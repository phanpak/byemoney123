import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Oracle Config
 *
 * This config compares:
 * - PROD: https://www.thiings.co/things (the oracle/source of truth)
 * - LOCAL: http://localhost:4321 (your Astro dev server)
 *
 * Tests must pass 100% for ralph-loop to consider the task complete.
 */

const PROD_URL = 'https://www.thiings.co/things';
const LOCAL_URL = 'http://localhost:4321';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: LOCAL_URL,
    trace: 'on-first-retry',
  },

  // Breakpoints to test
  projects: [
    {
      name: 'Desktop 1440',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'Desktop 1024',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad'] },
    },
    {
      name: 'Mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],

  // Auto-start dev server
  webServer: {
    command: 'npm run dev',
    url: LOCAL_URL,
    reuseExistingServer: !process.env.CI,
  },
});

// Export URLs for use in tests
export { PROD_URL, LOCAL_URL };
