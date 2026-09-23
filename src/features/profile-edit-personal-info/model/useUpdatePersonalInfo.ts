import { useUpdateUserField } from '../../../shared/lib/useUpdateUserField'
import type { PersonalInfo } from '../../../entities/user'

export const useUpdatePersonalInfo = (uid: string) =>
    useUpdateUserField<PersonalInfo>(uid, 'personalInfo')