<script setup lang="ts">
import { ClerkLoaded, ClerkLoading, SignIn } from 'vue-clerk'
import { Loader2 } from 'lucide-vue-next'

definePageMeta({
  middleware: ['public'],
  layout: 'auth',
})
</script>

<template>
  <ClientOnly>
    <ClerkLoaded>
      <SignIn path="/sign-in" fallback-redirect-url="/" sign-up-url="/sign-up" />
    </ClerkLoaded>
    <ClerkLoading>
      <Loader2 class="animate-spin text-muted-foreground" />
    </ClerkLoading>
  </ClientOnly>
</template>
