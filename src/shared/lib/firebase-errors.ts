import { FirebaseError } from 'firebase/app'

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Invalid email address',
  'auth/user-disabled': 'Account is disabled',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
  'auth/invalid-credential': 'Invalid email or password',
  'auth/email-already-in-use': 'Email already in use',
  'auth/weak-password': 'Password is too simple — at least 6 characters',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
  'auth/network-request-failed': 'Network issue. Please check your connection',
}

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return ERROR_MESSAGES[error.code] ?? 'Something went wrong. Please, try again.'
  }
  return 'Something went wrong. Please, try again.'
}