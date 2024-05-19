import { useQuery } from '@tanstack/vue-query'

export function useGetAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await useFetch('/api/accounts', {
        method: 'get',
      })

      if (!response.status)
        throw new Error('Failed to fetch accounts')

      return response.data
    },
  })
}
