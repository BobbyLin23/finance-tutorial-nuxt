<script lang="ts" setup>
import { Plus } from 'lucide-vue-next'
import { type Payment, columns } from './columns'

const newAccountStore = useNewAccountStore()

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
]
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pt-10">
    <Card class="border-none drop-shadow-md">
      <CardHeader class="gap-y-2 lg:flex lg:items-center lg:justify-between">
        <CardTitle class="text-xl line-clamp-1">
          Accounts Page
        </CardTitle>
        <Button size="sm" @click="newAccountStore.onOpen()">
          <Plus class="mr-2 size-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable :columns="columns" :data="data" />
      </CardContent>
    </Card>
  </div>
</template>
