import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { UserProfile } from './types'

export function useUsersList() {
    return useQuery({
        queryKey: ['users-list'],
        queryFn: async () => {
            const snapshot = await getDocs(collection(db, 'users'))
            return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as UserProfile)
        },
    })
}