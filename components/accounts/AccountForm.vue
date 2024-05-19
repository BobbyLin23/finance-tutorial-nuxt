<script lang="ts" setup>
import { Trash } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import type { z } from 'zod'

import { insertAccountSchema } from '~/server/db/schema'

interface Props {
  id?: string
  defaultValue?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled: Ref<true> | Ref<false>
}

const props = defineProps<Props>()

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

const form = useForm<FormValues>({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values: FormValues) => {
  props.onSubmit(values)
})

function handleDelete() {
  props.onDelete?.()
}
</script>

<template>
  <form class="space-y-4 pt-2" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            :disabled="disabled"
            placeholder="e.g. Cash, Bank, Credit Card"
            v-bind="componentField"
          />
        </FormControl>
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full" :disabled="disabled">
      {{ id ? 'Save changes' : 'Create account' }}
    </Button>
    <Button
      type="button"
      :disabled="disabled"
      class="w-full"
      variant="outline"
      @click="handleDelete"
    >
      <Trash class="mr-2 size-4" />
      Delete account
    </Button>
  </form>
</template>
