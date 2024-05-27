import { useQuery } from '@tanstack/vue-query'

import type { Account } from '~/types/accounts'

export function useGetAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await useFetch<Account[]>('/api/accounts', {
        method: 'get',
      })

      if (!response.status)
        throw new Error('Failed to fetch accounts')

      return response.data.value
    },
  })
}
