import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

type ResponseType = {
  id: string
}[] | null

interface RequestType {
  ids: string[]
}

export function useBulkDeleteAccounts() {
  const queryClient = useQueryClient()

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await useFetch('/api/accounts/bulk-delete', {
        method: 'POST',
        body: json,
      })
      return response.data.value
    },
    onSuccess: () => {
      toast.success('Accounts deleted')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: () => {
      toast.error('Failed to delete accounts')
    },
  })
}
