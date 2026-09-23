import { useQuery } from '@tanstack/react-query'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import { type UserProfile } from '../model/types'

export function useUserProfile(uid: string | undefined) {
    return useQuery({
        queryKey: ['user-profile', uid],
        queryFn: async () => {
            const snapshot = await getDoc(doc(db, 'users', uid!))
            if (!snapshot.exists()) {
                throw new Error('Профиль не найден')
            }
            return { uid: snapshot.id, ...snapshot.data() } as UserProfile
        },
        enabled: !!uid,
    })
}