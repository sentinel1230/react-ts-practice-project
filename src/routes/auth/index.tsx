import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthLayout } from './-components/AuthLayout'
import { auth } from '../../shared/lib/firebase'
import { waitForAuthInit } from '../../shared/lib/auth-ready'
import { z } from 'zod'

const authSearchSchema = z.object({
  mode: z.enum(['login', 'register']).catch('login'),
})

export const Route = createFileRoute('/auth/')({
  beforeLoad: async () => {
    await waitForAuthInit()
    if (auth.currentUser) {
      throw redirect({ to: '/profile' })
    }
  },
  component: AuthLayout,
  validateSearch: authSearchSchema,
})