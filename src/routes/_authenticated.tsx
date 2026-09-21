import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { auth } from '../shared/lib/firebase'
import { waitForAuthInit } from '../shared/lib/auth-ready'

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async () => {
        await waitForAuthInit()
        if (!auth.currentUser) {
            throw redirect({ to: '/auth', search: { mode: 'login' } })
        }
    },
  component: () => <Outlet />,
})
