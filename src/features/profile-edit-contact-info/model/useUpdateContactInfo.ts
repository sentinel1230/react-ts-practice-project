import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { ContactInfo } from '../../../entities/user'

export function useUpdateContactInfo(uid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ContactInfo) =>
            updateDoc(doc(db, 'users', uid), { contactInfo: data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile', uid] })
        },
    })
}