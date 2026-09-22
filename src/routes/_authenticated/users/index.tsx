import { createFileRoute } from '@tanstack/react-router'
import { useUsersList, UsersTable } from '../../../entities/user/'

export const Route = createFileRoute('/_authenticated/users/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data: users, isLoading, error } = useUsersList()

    if (isLoading) return <div className="p-6 text-text-muted">Loading...</div>
    if (error) return <div className="p-6 text-danger">Failed to load users</div>

    return (
        <>
            <div className="mb-5 flex items-center justify-between">
                <h1 className="text-lg font-bold text-text">Medical Staff</h1>
            </div>
            <UsersTable users={users ?? []} />
        </>

    )
}

