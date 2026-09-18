import { type InputHTMLAttributes, useId, useState } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ label, id, type = "text", ...rest }: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const isPassword = type === "password"

  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-text-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && isVisible ? "text" : type}
          className={`
          w-full rounded-lg border border-border-strong bg-white
          px-3.5 py-2.5 text-sm text-text outline-none
          placeholder:text-text-faint
          focus:border-primary focus:ring-3 focus:ring-primary-tint
          transition-colors
          ${isPassword ? 'pr-10' : ''}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-text-faint hover:text-text"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            onClick={() => setIsVisible(!isVisible)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}