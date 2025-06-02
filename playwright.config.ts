import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

export default defineConfig({
  // Directory containing test files
  testDir: './tests/e2e',

  // Default timeout settings for all tests
  timeout: 30_000, // Test timeout in milliseconds
  expect: { timeout: 5_000 }, // Expect assertions timeout

  // Test execution settings
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Fail if test.only is used in CI
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Number of workers (undefined = auto-detect)
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']], // Reporters configuration

  // Browser configuration shared by all projects
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000', // Base URL for tests
    trace: process.env.CI ? 'on-first-retry' : 'on', // Trace collection setting
    screenshot: 'only-on-failure', // Take screenshots only on test failures
    video: 'retain-on-failure', // Keep videos only for failed tests

    // Browser context settings
    viewport: { width: 1920, height: 1080 }, // Default viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
  },

  // Configure projects for different browsers
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile device emulation
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }, // Google Pixel 5 emulation
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }, // iPhone 12 emulation
    },
  ],

  // Development server configuration
  webServer: {
    command: 'npm run dev', // Command to start the dev server
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000', // Server URL
    reuseExistingServer: !process.env.CI, // Reuse server if already running (except in CI)
    timeout: 120_000, // Server startup timeout
  },
})
