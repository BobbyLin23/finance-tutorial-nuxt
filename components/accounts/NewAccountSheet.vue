<script lang="ts" setup>
const newAccountStore = useNewAccountStore()
const mutation = useCreateAccount()

async function onSubmit(values: Record<string, any>) {
  mutation.mutate(values, {
    onSuccess: () => {
      newAccountStore.onClose()
    },
  })
}

function handleUpdate(value: boolean) {
  if (value)
    newAccountStore.onOpen()
  else
    newAccountStore.onClose()
}
</script>

<template>
  <Sheet :open="newAccountStore.isOpen" @update:open="handleUpdate">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>New Account</SheetTitle>
        <SheetDescription>
          Create a new account to track your transactions;
        </SheetDescription>
      </SheetHeader>
      <AccountForm
        :disabled="mutation.isPending"
        :default-value="{
          name: '',
        }"
        @submit="onSubmit"
      />
    </SheetContent>
  </Sheet>
</template>
