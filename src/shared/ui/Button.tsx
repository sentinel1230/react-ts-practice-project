// src/shared/ui/Button.tsx
import { type ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton({ className, ...rest }: Props) {
    return (
        <button
            className="
        w-full rounded-lg bg-primary py-3 text-[0.90625rem] font-semibold text-white
        transition-colors hover:bg-primary-hover active:translate-y-px
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
      "
            {...rest}
        />
    )
}

export function OAuthButton({ children, ...rest }: Props) {
    return (
        <button
            className="
        flex items-center justify-center gap-2 rounded-lg border border-border-strong
        bg-white py-2.5 text-[0.84375rem] font-medium text-text
        transition-colors hover:bg-gray-50
      "
            {...rest}
        >
            {children}
        </button>
    )
}