import { useState } from 'react'
import { LoginForm } from '../../../features/auth-login'
import { RegisterForm } from '../../../features/auth-register'

import hCareLogo from '../../../assets/Hcare-logo.svg'

type Mode = 'login' | 'register'

const copy: Record<Mode, { title: string; subtitle: string }> = {
    login: {
        title: 'Welcome back',
        subtitle: 'Sign in to access the patient chart and appointment records.',
    },
    register: {
        title: 'Create an account',
        subtitle: 'Set up your profile to manage the patient chart and appointments.',
    },
}

export function AuthLayout() {
    const [mode, setMode] = useState<Mode>('login')
    const { title, subtitle } = copy[mode]

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 sm:px-6">
            <main
                className="
          flex min-h-screen w-full flex-col justify-center
          bg-white px-5 pb-7 pt-8
          sm:min-h-0 sm:max-w-md sm:justify-start sm:rounded-card
          sm:border sm:border-border sm:px-9 sm:pb-8 sm:pt-10
          sm:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.12)]
          sm:my-6
        "
            >
                <div className="mb-7 flex items-center gap-2.5">
                    <img src={hCareLogo} alt="HCare Logo" className="h-7 w-7" />
                    <span className="text-lg font-bold tracking-tight text-text">HCare</span>
                </div>

                <h1 className="mb-1 text-xl font-bold tracking-tight text-text sm:text-2xl">{title}</h1>
                <p className="mb-6 text-sm leading-relaxed text-text-muted">{subtitle}</p>

                <div role="tablist" aria-label="Login method" className="mb-6 flex gap-6 border-b border-border">
                    <TabButton active={mode === 'login'} onClick={() => setMode('login')}>
                        Login
                    </TabButton>
                    <TabButton active={mode === 'register'} onClick={() => setMode('register')}>
                        Register
                    </TabButton>
                </div>

                {mode === 'login' ? <LoginForm /> : <RegisterForm />}

                <p className="mt-5 text-center text-sm text-text-muted">
                    {mode === 'login' ? (
                        <>
                            No account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('register')}
                                className="font-medium text-primary hover:text-primary-hover cursor-pointer"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className="font-medium text-primary hover:text-primary-hover cursor-pointer"
                            >
                                Login
                            </button>
                        </>
                    )}
                </p>
            </main>
        </div>
    )
}

function TabButton({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={`
        relative pb-3 text-sm transition-colors cursor-pointer
        ${active ? 'text-text font-semibold' : 'text-text-faint font-small hover:text-text-muted'}
      `}
        >
            {children}
            {active && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
        </button>
    )
}