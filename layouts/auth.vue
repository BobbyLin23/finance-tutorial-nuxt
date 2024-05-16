<script setup lang="ts">
</script>

<template>
  <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
    <div class="h-full flex-col items-center justify-center px-4 lg:flex">
      <div class="space-y-4 pt-16 text-center">
        <h1 class="text-3xl font-bold text-[#2e2a47]">
          Welcome back!
        </h1>
        <p class="text-base text-[#7e8ca0]">
          Log in or Create an account to go back to your dashboard
        </p>
      </div>
      <div class="mt-8 flex items-center justify-center">
        <slot />
      </div>
    </div>
    <div class="hidden h-full items-center justify-center bg-blue-600 lg:flex">
      <NuxtImg src="/logo.svg" alt="logo" height="100" width="100" />
    </div>
  </div>
</template>
