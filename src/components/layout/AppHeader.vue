<template>
  <!--
   * Application header component with hide-on-scroll behavior
   * @displayName AppHeader
   -->
  <header
    class="header fixed-top bg-primary text-white p-3 shadow-sm transition-all"
    :class="{ 'header--hidden': isHeaderHidden }"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <div>
        <h1 class="h4 mb-0">Trading calculator</h1>
        <small class="d-block text-white-50">Strategy: LocalStorage</small>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Controls the visibility state of the header
 * @type {Ref<boolean>}
 */
const isHeaderHidden = ref(false)

/**
 * Stores the last scroll position for comparison
 * @type {number}
 */
let lastScrollPosition = 0

/**
 * Handles scroll events to show/hide header based on scroll direction
 * @function
 * @returns {void}
 */
const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

  // Ignore negative scroll positions (edge cases)
  if (currentScrollPosition < 0) return

  // Ignore small scroll movements (less than 50px) for better mobile UX
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 50) return

  // Hide header when scrolling down past 50px, show when scrolling up
  isHeaderHidden.value = currentScrollPosition > lastScrollPosition && currentScrollPosition > 50
  lastScrollPosition = currentScrollPosition
}

/**
 * Lifecycle hook: Adds scroll event listener when component mounts
 * @function
 * @returns {void}
 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

/**
 * Lifecycle hook: Removes scroll event listener when component unmounts
 * @function
 * @returns {void}
 */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/**
 * Base header styles with smooth transform transition
 */
.header {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

/**
 * Hidden state for the header (slides up out of view)
 */
.header--hidden {
  transform: translateY(-100%);
}
</style>
