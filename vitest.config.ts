import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Resolve directory paths for aliases
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Vite plugins configuration
  plugins: [
    vue(), // Vue 3 single file component support
    tsconfigPaths(), // TypeScript path mapping support
  ],

  // Vitest-specific configuration
  test: {
    // Core testing configuration
    globals: true, // Inject global APIs (describe, it, expect, etc.)
    environment: 'jsdom', // Test environment (simulates browser DOM)
    setupFiles: './tests/unit/setup.ts', // Global setup file
    include: ['**/*.spec.ts'], // Test file patterns
    exclude: [
      // Files to exclude from testing
      '**/node_modules/**',
      '**/e2e/**', // Exclude end-to-end tests
    ],

    // Code coverage configuration
    coverage: {
      enabled: true, // Enable coverage collection
      provider: 'v8', // Coverage engine (alternative: 'istanbul')
      reporter: [
        // Output formats
        'text', // Console output
        'json', // JSON file
        'html', // HTML report
        'lcov', // LCOV format for tools
      ],
      reportsDirectory: './coverage/unit', // Output directory
      exclude: [
        // Files to exclude from coverage
        '**/node_modules/**',
        '**/dist/**',
        '**/tests/**',
        '**/*.config.*', // Config files
        '**/types/**', // Type declarations
        '**/main.ts', // App entry point
        '**/App.vue', // Root component
        '**/__mocks__/**', // Mock files
      ],
      thresholds: {
        // Minimum coverage requirements
        lines: 80, // 80% line coverage
        functions: 80, // 80% function coverage
        branches: 80, // 80% branch coverage
        statements: 80, // 80% statement coverage
      },
    },

    // DOM environment configuration
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:5173', // Base URL for JSDOM
        resources: 'usable', // Resource loading behavior
      },
    },

    // Performance and behavior settings
    testTimeout: 10_000, // Default test timeout (10 seconds)
    hookTimeout: 20_000, // Timeout for setup/teardown hooks
    open: false, // Don't open UI by default
    clearMocks: true, // Clear mock calls between tests
    mockReset: true, // Reset mock state between tests

    // Custom module resolution
    alias: {
      '@': resolve(__dirname, './src'), // Source directory alias
      '~tests': resolve(__dirname, './tests'), // Test directory alias
    },
  },

  // Shared Vite configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Shared source directory alias
    },
  },
})
