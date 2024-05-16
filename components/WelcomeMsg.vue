<script setup lang="ts">
import { useUser } from 'vue-clerk'

const user = useUser()
</script>

<template>
  <div class="mb-4 space-y-2">
    <h2 class="text-2xl font-medium text-white lg:text-4xl">
      Welcome back {{ user?.user.value?.firstName }}👋🏻
    </h2>
    <p class="text-sm text-[#89b6fd] lg:text-base">
      This is your financial overview report.
    </p>
  </div>
</template>
