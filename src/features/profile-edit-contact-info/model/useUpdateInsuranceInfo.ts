import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { InsuranceInfo } from '../../../entities/user/model/types'

export function useUpdateInsuranceInfo(uid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: InsuranceInfo) =>
            updateDoc(doc(db, 'users', uid), { insuranceInfo: data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile', uid] })
        },
    })
}