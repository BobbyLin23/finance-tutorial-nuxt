<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const newAccountStore = useNewAccountStore()

function handleClick() {
  newAccountStore.onOpen()
}
</script>

<template>
  <div>
    <Button @click="handleClick">
      Click
    </Button>
  </div>
</template>
