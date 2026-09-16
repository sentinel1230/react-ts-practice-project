import { createFileRoute } from '@tanstack/react-router'

import { LoginForm } from '../../features/auth-login'
import { RegisterForm } from '../../features/auth-register'
import { useState } from 'react'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
      <span>Auth Page</span>
      <div onClick={() => setIsLogin(!isLogin)}>Switch to {isLogin ? 'Register' : 'Login'}</div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}
