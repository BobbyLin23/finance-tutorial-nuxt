import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

export function useCreateAccount() {
  const queryClient = useQueryClient()

  return useMutation<any, Error, any>({
    mutationFn: async (json) => {
      const response = await useFetch('/api/accounts', {
        method: 'post',
        body: json,
      })
      return response.data
    },
    onSuccess: () => {
      toast.success('Account created')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: () => {
      toast.error('Failed to create account')
    },
  })
}
