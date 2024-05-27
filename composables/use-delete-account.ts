import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

type ResponseType = {
  id: string
} | null

export function useDeleteAccount(id?: string) {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await useFetch('/api/accounts/:id', {
        method: 'DELETE',
        params: { id },
      })

      return response.data.value
    },
    onSuccess: () => {
      toast.success('Account deleted')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['accounts', { id }] })
    },
    onError: () => {
      toast.error('Failed to delete account')
    },
  })
}
