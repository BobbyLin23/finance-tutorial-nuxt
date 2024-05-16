<script setup lang="ts">
import { UserButton } from 'vue-clerk'

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <Button>Click</Button>
    <UserButton after-sign-out-url="/sign-in" />
  </div>
</template>
