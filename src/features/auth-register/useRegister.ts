import { useMutation } from "@tanstack/react-query"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "../../shared/lib/firebase"
import { setDoc, doc } from "firebase/firestore"
import { useNavigate } from '@tanstack/react-router'
import { type RegisterInput } from './schema'

export function useRegister() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async ({ email, password, firstName, lastName }: RegisterInput) => {
            const credential = await createUserWithEmailAndPassword(auth, email, password)
            const user = credential.user
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            })
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                createdAt: new Date().toISOString(),
            })

            return user
        },
        onSuccess: () => {
            navigate({ to: '/profile' })
        },
        onError: (err) => {
            console.error('Registration error:', err)
        },
    })
}