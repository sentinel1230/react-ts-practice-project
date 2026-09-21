import { useState } from 'react'
import { useUpdateContactInfo } from './useUpdateContactInfo'
import { Input } from '../../shared/ui/Input'
import { SubmitButton } from '../../shared/ui/Button'
import type { ContactInfo } from '../../entities/user/types'

type Props = {
    uid: string
    initialData: ContactInfo | undefined
    onSuccess: () => void
}

export function EditContactInfoForm({ uid, initialData, onSuccess }: Props) {
    const [fullName, setFullName] = useState(initialData?.fullName ?? '')
    const [phone, setPhone] = useState(initialData?.phone ?? '')
    const [homePhone, setHomePhone] = useState(initialData?.homePhone ?? '')
    const [email, setEmail] = useState(initialData?.email ?? '')
    const [address, setAddress] = useState(initialData?.address ?? '')

    const { mutate, isPending, error } = useUpdateContactInfo(uid)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(
            { fullName, phone, homePhone, email, address },
            { onSuccess }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Home Phone" value={homePhone} onChange={(e) => setHomePhone(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

            {error && <p className="mb-4 text-sm text-danger">Failed to save changes</p>}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
            </SubmitButton>
        </form>
    )
}