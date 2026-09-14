import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from '../../features/auth-login'
import { RegisterForm } from '../../features/auth-register'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div>
        <span>Auth Page</span>
        <LoginForm />
        <RegisterForm />
    </div>
  )
}
