import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { Appointment } from '../../../entities/user'

export function useAddAppointment(uid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Appointment) =>
            updateDoc(doc(db, 'users', uid), { appointments: arrayUnion(data) }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-profile', uid] })
        },
    })
}