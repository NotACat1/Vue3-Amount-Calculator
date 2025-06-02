<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const increment = () => counter.increment()
</script>

<template>
  <div class="container mt-5">
    <h1>Home Page</h1>
    <p class="lead">Welcome to the Vue 3 + Bootstrap + Pinia + TS App!</p>

    <div class="mb-4">
      <img
        src="@/assets/images/vue.svg"
        alt="Description of image"
        class="img-fluid rounded"
        style="max-height: 300px"
      />
    </div>

    <button class="btn btn-primary" @click="increment">Count: {{ counter.count }}</button>
  </div>
</template>
