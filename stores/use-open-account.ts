import { defineStore } from 'pinia'

// export const useOpenAccountStore = defineStore('open-account', () => {
//   const isOpen = ref(false)
//   const id = ref<string>()

//   function onOpen(val: string) {
//     id.value = val
//     isOpen.value = true
//   }

//   function onClose() {
//     isOpen.value = false
//     id.value = undefined
//   }

//   return { id, isOpen, onOpen, onClose }
// })

export const useOpenAccountStore = defineStore('open-account', {
  state: () => ({
    isOpen: false,
    id: undefined as string | undefined,
  }),
  actions: {
    onOpen(val: string) {
      this.id = val
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
      this.id = undefined
    },
  },
})
