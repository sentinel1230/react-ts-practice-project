import { useMutation } from '@tanstack/react-query'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../shared/lib/firebase'
import { useNavigate } from '@tanstack/react-router'

type LoginInput = {
  email: string
  password: string
}

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ email, password }: LoginInput) =>
      signInWithEmailAndPassword(auth, email, password),
    onSuccess: () => {
      navigate({ to: '/profile' })
    },
  })
}