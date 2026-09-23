import { useUpdateUserField } from '../../../shared/lib/useUpdateUserField'
import type { ContactInfo } from '../../../entities/user'

export const useUpdateContactInfo = (uid: string) =>
    useUpdateUserField<ContactInfo>(uid, 'contactInfo')