// src/features/auth-register/RegisterForm.tsx
import { useState } from 'react'
import { useRegister } from './useRegister'
import { getFirebaseErrorMessage } from '../../shared/lib/firebase-errors'
import { Input } from '../../shared/ui/Input'
import { SubmitButton } from '../../shared/ui/Button'

export function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate, isPending, error } = useRegister()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({ email, password, firstName, lastName })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
                <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
            />

            {error && (
                <p className="mb-4 text-sm text-danger">{getFirebaseErrorMessage(error)}</p>
            )}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Creating account...' : 'Create account'}
            </SubmitButton>


        </form>
    )
}