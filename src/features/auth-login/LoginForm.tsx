// src/features/auth-login/LoginForm.tsx
import { useState } from 'react'
import { useLogin } from './useLogin'
import { getFirebaseErrorMessage } from '../../shared/lib/firebase-errors'
import { Input } from '../../shared/ui/Input'
import { SubmitButton } from '../../shared/ui/Button'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate, isPending, error } = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate({ email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />
            <Input
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />

            {error && (
                <p className="mb-4 text-sm text-danger">{getFirebaseErrorMessage(error)}</p>
            )}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Entering...' : 'Login'}
            </SubmitButton>
        </form>
    )
}