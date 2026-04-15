import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, 
  timeout: 30000,
  
  preserveOutput: 'never',
  outputDir: 'test-results/', 

  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'reports/allure-results' }]
  ],
});