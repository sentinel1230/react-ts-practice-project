import { Avatar } from '../../../shared/ui/Avatar'
import type { UserProfile } from '../model/types'

type Props = {
    users: UserProfile[]
}

export function UsersTable({ users }: Props) {
    return (
        <div className="overflow-x-auto rounded-lg border border-border bg-white">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border text-left text-xs text-text-muted">
                        <th className="font-light px-5 py-3">Name</th>
                        <th className="font-light px-5 py-3">Email</th>
                        <th className="font-light px-5 py-3">Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid} className="border-b border-border last:border-0 hover:bg-gray-50">
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                    <Avatar firstName={user.firstName} lastName={user.lastName} />
                                    <div>
                                        <p className="font-medium text-text">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs text-text-faint">Patient</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-3.5 text-text">{user.email}</td>
                            <td className="px-5 py-3.5 text-text">
                                {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-text-faint">No users yet</p>
            )}
        </div>
    )
}