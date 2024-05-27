<script lang="ts" setup>
import { Trash } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { insertAccountSchema } from '~/server/db/schema'

interface Props {
  id?: string
  defaultValue?: any
  onSubmit: (values: any) => void
  onDelete?: () => void
  disabled: boolean
}

const props = defineProps<Props>()

const formSchema = toTypedSchema(
  insertAccountSchema.pick({
    name: true,
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.defaultValue,
})

const onSubmit = form.handleSubmit((values) => {
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
      v-if="props.id"
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
