import type { ZodError } from 'zod'

export function getFieldErrors<T extends string>(error: ZodError): Partial<Record<T, string>> {
  const errors: Partial<Record<T, string>> = {}
  for (const issue of error.issues) {
    const field = issue.path[0] as T
    errors[field] = issue.message
  }
  return errors
}