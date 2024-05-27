<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

const routes = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/settings',
    label: 'Settings',
  },
]

const router = useRouter()
const isMobile = useMediaQuery('(max-width: 1024px)')
const isOpen = ref(false)

function onclick(href: string) {
  router.push(href)
  isOpen.value = false
}
</script>

<template>
  <nav class="hidden items-center gap-x-2 overflow-x-auto lg:flex">
    <NavButton
      v-for="route in routes"
      :key="route.href"
      :label="route.label"
      :href="route.href"
      :is-active="route.href === $route.path"
    />
  </nav>
  <Sheet v-if="isMobile">
    <SheetTrigger :open="isOpen">
      <Button
        variant="outline"
        size="sm"
        class="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 focus:bg-white/30
        focus-visible:ring-transparent focus-visible:ring-offset-0"
      >
        <Menu class="w-4 h-4" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="px-2">
      <nav class="flex flex-col gap-y-2 pt-6">
        <Button
          v-for="route in routes"
          :key="route.href"
          :variant="route.href === $route.path ? 'secondary' : 'ghost'"
          @click="() => {
            onclick(route.href)
            isOpen = false
          }"
        >
          {{ route.label }}
        </Button>
      </nav>
    </SheetContent>
  </Sheet>
</template>
