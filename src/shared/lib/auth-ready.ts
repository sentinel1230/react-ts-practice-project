import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

let readyPromise: Promise<void> | null = null

export function waitForAuthInit(): Promise<void> {
    if (!readyPromise) {
        readyPromise = new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, () => {
                unsubscribe()
                resolve()
            })
        })
    }
    return readyPromise
}