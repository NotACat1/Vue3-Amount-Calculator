<template>
  <!-- Main application container with flex layout to ensure footer sticks to bottom -->
  <div class="app-container">
    <!-- Application header component -->
    <AppHeader />

    <!-- Main content area that grows to fill available space -->
    <main class="flex-grow-1 py-5">
      <div class="container">
        <!-- Router view where route components will be rendered -->
        <router-view />
      </div>
    </main>

    <!-- Application footer component -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * @file AppLayout.vue
 * @description Main layout component that structures the application with header,
 *              main content area, and footer. Uses Vue Router's router-view for
 *              dynamic content rendering.
 */

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style scoped>
/**
 * Styles for the main application container
 * Uses flexbox to create a column layout that ensures the footer stays at the bottom
 * Minimum height is set to 100vh (viewport height) to fill the screen
 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
