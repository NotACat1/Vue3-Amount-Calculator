<template>
  <!-- 
   * Application footer component
   * Displays copyright information and current storage strategy
   * @displayName AppFooter
   -->
  <footer class="bg-dark text-white py-4 mt-auto">
    <div class="container text-center">
      <p class="mb-2">Current storage strategy: <strong>LocalStorage</strong></p>
      <p class="mb-0">&copy; {{ currentYear }} Trading calculator. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * Current year reactive reference
 * @type {import('vue').Ref<number>}
 */
const currentYear = ref(new Date().getFullYear())
</script>
