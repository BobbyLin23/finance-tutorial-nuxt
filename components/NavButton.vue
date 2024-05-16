<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{
  href: string
  label: string
  isActive?: boolean
}>()
</script>

<template>
  <Button
    as-child
    variant="outline"
    size="sm"
    :class="cn('w-full justify-between border-none font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto',
               isActive ? 'bg-white/10 text-white' : 'bg-transparent')"
  >
    <NuxtLink :href="href">
      {{ label }}
    </NuxtLink>
  </Button>
</template>
