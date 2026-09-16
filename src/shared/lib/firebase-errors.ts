import { FirebaseError } from 'firebase/app'

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Некорректный email',
  'auth/user-disabled': 'Аккаунт заблокирован',
  'auth/user-not-found': 'Пользователь с таким email не найден',
  'auth/wrong-password': 'Неверный пароль',
  'auth/invalid-credential': 'Неверный email или пароль',
  'auth/email-already-in-use': 'Пользователь с таким email уже зарегистрирован',
  'auth/weak-password': 'Пароль слишком простой — минимум 6 символов',
  'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже',
  'auth/network-request-failed': 'Проблема с сетью. Проверьте подключение',
}

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return ERROR_MESSAGES[error.code] ?? 'Что-то пошло не так. Попробуйте ещё раз'
  }
  return 'Что-то пошло не так. Попробуйте ещё раз'
}