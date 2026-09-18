import { createFileRoute } from '@tanstack/react-router'
import { useCurrentUser } from '../../entities/user/useCurrentUser'
import { useUserProfile } from '../../entities/user/useUserProfile'
import { useLogout } from '../../entities/user/useLogout'

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoading: authLoading } = useCurrentUser()
  const { data: profile, isLoading: profileLoading } = useUserProfile(user?.uid)
  const { mutate: logout, isPending: isLoggingOut } = useLogout()

  if (authLoading || profileLoading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return <div>Вы не авторизованы</div>
  }

  return (
    <div>
      <h1>Профиль</h1>
      <p>Имя: {profile?.firstName} {profile?.lastName}</p>
      <p>Email: {profile?.email}</p>

      <button onClick={() => logout()} disabled={isLoggingOut}>
        {isLoggingOut ? 'Quitting...' : 'Exit'}
      </button>
    </div>
  )
}