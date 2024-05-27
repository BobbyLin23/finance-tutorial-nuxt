import { useQuery } from '@tanstack/vue-query'

export function useGetAccount(id?: string) {
  return useQuery({
    enabled: !!id,
    queryKey: ['accounts', { id }],
    queryFn: async () => {
      console.log('useGetAccount', id)

      const response = await $fetch('/api/accounts/:id', {
        method: 'get',
        params: {
          id,
        },
      })

      // console.log('response', response)

      if (!response)
        throw new Error('Failed to fetch accounts')

      return response
    },
  })
}
