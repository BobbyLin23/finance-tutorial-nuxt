<script lang="ts" setup>
import { Loader2, Plus } from 'lucide-vue-next'
import type { Row } from '@tanstack/vue-table'

import { columns } from './columns'
import type { Account } from '~/types/accounts'

const newAccountStore = useNewAccountStore()

const accountsQuery = useGetAccounts()
const deleteAccounts = useBulkDeleteAccounts()

const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending

const accounts = accountsQuery.data
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pt-10">
    <Card class="border-none drop-shadow-md">
      <CardHeader v-if="accountsQuery.isLoading.value">
        <Skeleton class="h-8 w-48" />
      </CardHeader>
      <CardHeader v-else class="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle class="text-xl line-clamp-1">
          Accounts Page
        </CardTitle>
        <Button size="sm" @click="newAccountStore.onOpen()">
          <Plus class="mr-2 size-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div
          v-if="accountsQuery.isLoading.value"
          class="flex h-[500px] w-full items-center justify-center"
        >
          <Loader2 class="size-6 animate-spin text-slate-300" />
        </div>
        <DataTable
          v-else
          :columns="columns"
          :data="accounts"
          filter-key="name"
          :disabled="isDisabled"
          :on-delete="(rows: Row<Account>[]) => {
            const ids = rows.map((row: Row<Account>) => row.original.id)
            deleteAccounts.mutate({ ids })
          }"
        />
      </CardContent>
    </Card>
  </div>
</template>
