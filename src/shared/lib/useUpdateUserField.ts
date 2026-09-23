import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

export function useUpdateUserField<T>(uid: string, field: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: T) =>
            updateDoc(doc(db, 'users', uid), { [field]: data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile', uid] })
        },
    })
}