<script setup lang="ts">
/**
 * Importing the OrderForm component for handling order creation/management
 * @module OrderForm
 */
import OrderForm from '@/components/OrderForm.vue'

/**
 * Importing the LogViewer component for displaying application logs
 * @module LogViewer
 */
import LogViewer from '@/components/LogViewer.vue'
</script>

<template>
  <!-- Main application layout containing two primary components -->
  <OrderForm />
  <LogViewer />
</template>
