import { type InputHTMLAttributes, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  error?: string,
}

export function Input({ label, id, type = "text", error, ...rest }: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

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
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
          w-full rounded-lg border border-border-strong bg-white
          px-3.5 py-2.5 text-sm text-text outline-none
          placeholder:text-text-faint
          focus:border-primary focus:ring-3 focus:ring-primary-tint
          transition-colors
          ${isPassword ? 'pr-10' : ''}
          ${error
              ? 'border-danger focus:border-danger focus:ring-3 focus:ring-danger/10'
              : 'border-border-strong focus:border-primary focus:ring-3 focus:ring-primary-tint'}
          `}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-text-faint cursor-pointer hover:text-text"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            onClick={() => setIsVisible(!isVisible)}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Eye
                size={18}
                strokeWidth={1.8}
                className={`absolute transition-all duration-200 transform ${isVisible
                  ? 'opacity-100'
                  : 'opacity-0'
                  }`}
              />
              <EyeOff
                size={18}
                strokeWidth={1.8}
                className={`absolute transition-all duration-200 transform ${!isVisible
                  ? 'opacity-100'
                  : 'opacity-0'
                  }`}
              />
            </div>
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}

    </div>
  )
}