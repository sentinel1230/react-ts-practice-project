import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { auth } from '../shared/lib/firebase'
import { waitForAuthInit } from '../shared/lib/auth-ready'
import { useState } from 'react'
import { Navbar } from '../widgets/navBar'
import { Sidebar } from '../widgets/sideBar'



export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async () => {
        await waitForAuthInit()
        if (!auth.currentUser) {
            throw redirect({ to: '/auth', search: { mode: 'login' } })
        }
    },
    component: () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false)

        return (
            <>
                <Navbar onMenuClick={() => setIsMenuOpen(true)} />
                <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                    
                <div className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8">
                    <div className="mx-auto w-full sm:w-[80%] sm:min-w-[640px]">
                        <div className="rounded-lg border-none bg-white p-5 shadow-card sm:p-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </>
        )
    }

})
