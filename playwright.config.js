// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Global Timeouts */
  timeout: 60000, // 60s per test to handle slow dynamic content
  expect: {
    timeout: 20000, // max wait for expect(locator) assertions
  },

  /* Parallel execution */
  fullyParallel: true,
  //forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1, // retry once on CI, no retries locally
  workers: 2, // keep 1 for debugging

  /* Reporting & Debugging */
  reporter: [['html', { open: 'on-failure' }]],

  use: {
    baseURL: 'https://ojiiz.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    headless: process.env.HEADLESS !== 'true',

    // =========================
    // NEW ACTION TIMEOUT
    actionTimeout: 20000, // 20s max wait per click/fill/etc

    // Slow motion for debugging (optional)
    // launchOptions: { slowMo: 50 },
  },

  /* Browser Projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});