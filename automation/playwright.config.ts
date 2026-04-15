import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  outputDir: 'test-results', 
  preserveOutput: 'never', 
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'reports/allure-results' }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'off',
    video: 'off',
    trace: 'off', 
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});