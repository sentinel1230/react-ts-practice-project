import { useState } from 'react'
import { useUpdateInsuranceInfo } from '../model/useUpdateInsuranceInfo'
import { Input } from '../../../shared/ui/Input'
import { SubmitButton } from '../../../shared/ui/Button'
import type { InsuranceInfo } from '../../../entities/user'

type Props = {
    uid: string
    initialData: InsuranceInfo | undefined
    onSuccess: () => void
}

export function EditInsuranceInfoForm({ uid, initialData, onSuccess }: Props) {
    const [memberId, setMemberId] = useState(initialData?.memberId ?? '')
    const [insuranceProvider, setInsuranceProvider] = useState(initialData?.insuranceProvider ?? '')

    const { mutate, isPending, error } = useUpdateInsuranceInfo(uid)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate({ memberId, insuranceProvider }, { onSuccess })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Member ID" value={memberId} onChange={(e) => setMemberId(e.target.value)} />
            <Input
                label="Insurance Provider"
                value={insuranceProvider}
                onChange={(e) => setInsuranceProvider(e.target.value)}
            />

            {error && <p className="mb-4 text-sm text-danger">Failed to save changes</p>}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
            </SubmitButton>
        </form>
    )
}