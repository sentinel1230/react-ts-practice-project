import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { PersonalInfo } from '../../../entities/user'

export function useUpdatePersonalInfo(uid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PersonalInfo) =>
            updateDoc(doc(db, 'users', uid), { personalInfo: data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile', uid] })
        },
    })
}