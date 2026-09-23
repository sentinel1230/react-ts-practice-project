import { useUpdateUserField } from '../../../shared/lib/useUpdateUserField'
import type { InsuranceInfo } from '../../../entities/user'

export const useUpdateInsuranceInfo = (uid: string) =>
    useUpdateUserField<InsuranceInfo>(uid, 'insuranceInfo')