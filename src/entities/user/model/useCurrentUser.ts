import { useEffect, useState } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../shared/lib/firebase'

export function useCurrentUser() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return { user, isLoading}
}