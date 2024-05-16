<script setup lang="ts">
import { ClerkLoaded, ClerkLoading, UserButton } from 'vue-clerk'
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <header class="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14">
    <div class="mx-auto max-w-screen-2xl">
      <div class="mb-14 flex w-full items-center justify-between">
        <div class="flex items-center lg:gap-x-16">
          <HeaderLogo />
          <Navigation />
        </div>
        <ClientOnly>
          <ClerkLoaded>
            <UserButton after-sign-out-url="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 class="size-4 animate-spin text-slate-400" />
          </ClerkLoading>
        </ClientOnly>
      </div>
      <ClientOnly>
        <WelcomeMsg />
      </ClientOnly>
    </div>
  </header>
</template>
