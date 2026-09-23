import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { ContactChannel } from '../../../entities/user'

export function useContactPreference(uid: string) {
    const queryClient = useQueryClient()

    console.log('useContactPreference вызван с uid:', JSON.stringify(uid))

    return useMutation({
        mutationFn: ({ channel, value }: { channel: ContactChannel; value: boolean }) => {
            console.log('mutationFn СТАРТ', { uid, channel, value })
            return updateDoc(doc(db, 'users', uid), { [`contactPreferences.${channel}`]: value })
        },
        onSuccess: () => {
            console.log('onSuccess сработал')
            queryClient.invalidateQueries({ queryKey: ['user-profile', uid] })
        },
        onError: (err) => {
            console.error('onError сработал:', err)
        },
    })
}