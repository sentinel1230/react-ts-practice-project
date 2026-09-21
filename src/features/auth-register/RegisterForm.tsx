import { useState } from 'react'
import { useRegister } from './useRegister'
import { getFirebaseErrorMessage } from '../../shared/lib/firebase-errors'
import { getFieldErrors } from '../../shared/lib/zod-errors'
import { Input } from '../../shared/ui/Input'
import { SubmitButton } from '../../shared/ui/Button'
import { registerSchema } from './schema'

type FieldErrors = Partial<Record<'email' | 'password' | 'firstName' | 'lastName', string>>

export function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

    const { mutate, isPending, error } = useRegister()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const result = registerSchema.safeParse({ email, password, firstName, lastName })

        if (!result.success) {
            setFieldErrors(getFieldErrors<keyof FieldErrors>(result.error))
            return
        }

        setFieldErrors({})
        mutate(result.data)
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <Input
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={fieldErrors.firstName}
                    />
                </div>
                <div>
                    <Input
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={fieldErrors.lastName}
                    />
                </div>
            </div>

            <div>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    error={fieldErrors.email}
                />
            </div>

            <div>
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    error={fieldErrors.password}
                />
            </div>

            {error && (
                <p className="mb-4 text-sm text-danger">{getFirebaseErrorMessage(error)}</p>
            )}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Creating account...' : 'Create account'}
            </SubmitButton>
        </form>
    )
}