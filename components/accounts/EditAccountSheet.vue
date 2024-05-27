<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'

const confirmModalRef = ref()

const openAccountStore = useOpenAccountStore()

const { id } = storeToRefs(openAccountStore)
const accountQuery = useGetAccount(id.value)
const editMutation = useEditAccount(id.value)
const deleteMutation = useDeleteAccount(openAccountStore.id)

const isPending = editMutation.isPending || deleteMutation.isPending
const isLoading = accountQuery.isLoading

const defaultValues = accountQuery.data

function onSubmit(values: any) {
  editMutation.mutate(values, {
    onSuccess: () => {
      openAccountStore.onClose()
    },
  })
}

async function onDelete() {
  const ok = await confirmModalRef.value?.confirm()

  if (ok) {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        openAccountStore.onClose()
      },
    })
  }
}

function handleUpdate(value: boolean) {
  if (value)
    openAccountStore.onOpen(id.value!)
  else
    openAccountStore.onClose()
}

watch(() => openAccountStore.isOpen, async () => {
  if (openAccountStore.isOpen) {
    console.log('fetching account', id.value)
    await accountQuery.refetch()
  }
})
</script>

<template>
  <Sheet :open="openAccountStore.isOpen" @update:open="handleUpdate">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>Edit Account</SheetTitle>
        <SheetDescription>Edit an existing account</SheetDescription>
      </SheetHeader>
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
        <Loader2 class="size-4 animate-spin text-muted-foreground" />
      </div>
      <AccountForm
        v-else
        :id="id"
        :on-submit="onSubmit"
        :disabled="isPending"
        :default-value="defaultValues"
        :on-delete="onDelete"
      />
    </SheetContent>
  </Sheet>
  <ConfirmModal
    ref="confirmModalRef"
    title="Are you sure?"
    message="You are about to delete this transaction."
  />
</template>
