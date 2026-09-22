import { Link, useMatchRoute } from '@tanstack/react-router'
import { X, User, Users, LogOut } from 'lucide-react'
import { useLogout } from '../../entities/user'

type Props = {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: Props) {
    const matchRoute = useMatchRoute()
    const { mutate: logout, isPending: isLoggingOut } = useLogout()

    const isProfileActive = !!matchRoute({ to: '/profile' })
    const isUsersActive = !!matchRoute({ to: '/users' })

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex h-14 items-center justify-between border-b border-border px-4">
                    <span className="text-base font-bold tracking-tight text-text">Menu</span>
                    <button onClick={onClose} className="text-text-muted hover:text-text" aria-label="Close menu">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 p-3">
                    <Link
                        to="/profile"
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isProfileActive ? 'bg-primary-tint text-primary' : 'text-text-muted hover:bg-gray-50'}`}
                    >
                        <User size={18} />
                        Profile
                    </Link>
                    <Link
                        to="/users"
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isUsersActive ? 'bg-primary-tint text-primary' : 'text-text-muted hover:bg-gray-50'}`}
                    >
                        <Users size={18} />
                        Users
                    </Link>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 border-t border-border p-3">
                    <button
                        onClick={() => logout()}
                        disabled={isLoggingOut}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-danger hover:bg-red-50 disabled:opacity-60"
                    >
                        <LogOut size={18} />
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </aside>
        </>
    )
}