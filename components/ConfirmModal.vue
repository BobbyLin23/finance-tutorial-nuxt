<script lang="ts" setup>
defineProps<{
  title: string
  message: string
}>()

const promise = ref<{
  resolve: (value: boolean) => void
} | null>(null)

function confirm() {
  return new Promise((resolve) => {
    promise.value = { resolve }
  })
}

function handleClose() {
  promise.value = null
}

function handleConfirm() {
  promise.value?.resolve(true)
  handleClose()
}

function handleCancel() {
  promise.value?.resolve(false)
  handleClose()
}

defineExpose({
  confirm,
})
</script>

<template>
  <Dialog :open="promise !== null">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ message }}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="handleCancel">
          Cancel
        </Button>
        <Button @click="handleConfirm">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
