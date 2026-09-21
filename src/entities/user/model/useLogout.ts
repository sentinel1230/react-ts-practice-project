import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from 'firebase/auth'
import { useNavigate } from '@tanstack/react-router'
import { auth } from '../../../shared/lib/firebase'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      queryClient.clear()
      navigate({ to: '/auth', search: { mode: 'login' } })
    },
  })
}