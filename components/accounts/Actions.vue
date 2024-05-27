<script lang="ts" setup>
import { Edit, MoreHorizontal, Trash } from 'lucide-vue-next'
import { useOpenAccountStore } from '~/stores/use-open-account'

const props = defineProps<{
  id: string
}>()

const confirmModalRef = ref()

const deleteMutation = useDeleteAccount(props.id)
const store = useOpenAccountStore()

async function handleDelete() {
  const ok = await confirmModalRef.value?.confirm()

  if (ok)
    deleteMutation.mutate()
}
</script>

<template>
  <ConfirmModal
    ref="confirmModalRef"
    title="Are you sure?"
    message="You are about to delete this transaction."
  />
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 p-0">
        <MoreHorizontal class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        :disabled="deleteMutation.isPending.value"
        @click="store.onOpen(id)"
      >
        <Edit class="mr-2 size-4" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        :disabled="deleteMutation.isPending.value"
        @click="handleDelete"
      >
        <Trash class="mr-2 size-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
