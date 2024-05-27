import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export function useEditAccount(id?: string) {
  const queryClient = useQueryClient()

  return useMutation<any, Error, any>({
    mutationFn: async (json) => {
      console.log('id', id)
      const response = await useFetch('/api/accounts/:id', {
        method: 'PATCH',
        params: { id },
        body: JSON.stringify(json),
      })
      console.log('response', response.data.value)
      return response.data.value
    },
    onSuccess: () => {
      toast.success('Account updated')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['accounts', { id }] })
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error('Failed to edit account')
    },
  })
}
