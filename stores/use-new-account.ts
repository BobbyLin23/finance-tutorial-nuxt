import { defineStore } from 'pinia'

export const useNewAccountStore = defineStore('new-account', () => {
  const isOpen = ref(false)

  function onOpen() {
    isOpen.value = true
  }

  function onClose() {
    isOpen.value = false
  }

  return { isOpen, onOpen, onClose }
})
