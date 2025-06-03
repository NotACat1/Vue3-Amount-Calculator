<script setup lang="ts" />

<template>
  <!-- 404 Error Page: Displayed when route doesn't match any known path -->
  <div class="mt-5">
    <!-- Main error heading -->
    <h1>404 - Page Not Found</h1>

    <!-- Descriptive error message -->
    <p class="lead">Oops! The page you're looking for doesn't exist.</p>

    <!-- Navigation button to return to home page -->
    <router-link to="/" class="btn btn-primary">Go Home</router-link>
  </div>
</template>
