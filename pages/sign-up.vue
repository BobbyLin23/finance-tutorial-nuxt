<script setup lang="ts">
import { ClerkLoaded, ClerkLoading, SignUp } from 'vue-clerk'
import { Loader2 } from 'lucide-vue-next'

definePageMeta({
  middleware: ['public'],
  layout: 'auth',
})
</script>

<template>
  <ClientOnly>
    <ClerkLoaded>
      <SignUp path="/sign-up" fallback-redirect-url="/" sign-in-url="/sign-in" />
    </ClerkLoaded>
    <ClerkLoading>
      <Loader2 class="animate-spin text-muted-foreground" />
    </ClerkLoading>
  </ClientOnly>
</template>
