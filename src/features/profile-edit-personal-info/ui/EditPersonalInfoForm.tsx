import { useState } from 'react'
import { useUpdatePersonalInfo } from '../model/useUpdatePersonalInfo'
import { Input } from '../../../shared/ui/Input'
import { SubmitButton } from '../../../shared/ui/Button'
import type { PersonalInfo } from '../../../entities/user'

type Props = {
    uid: string
    initialData: PersonalInfo | undefined
    onSuccess: () => void
}

export function EditPersonalInfoForm({ uid, initialData, onSuccess }: Props) {
    const [gender, setGender] = useState<PersonalInfo['gender']>(initialData?.gender ?? 'male')
    const [birthDate, setBirthDate] = useState(initialData?.birthDate ?? '')
    const [patientId, setPatientId] = useState(initialData?.patientId ?? '')
    const [nationality, setNationality] = useState(initialData?.nationality ?? '')
    const [maritalStatus, setMaritalStatus] = useState<PersonalInfo['maritalStatus']>(
        initialData?.maritalStatus ?? 'single'
    )
    const [emergencyContact, setEmergencyContact] = useState(initialData?.emergencyContact ?? '')

    const { mutate, isPending, error } = useUpdatePersonalInfo(uid)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(
            { gender, birthDate, patientId, nationality, maritalStatus, emergencyContact },
            { onSuccess }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="mb-4 block text-sm">
                <span className="mb-1 block text-text-faint">Gender</span>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as PersonalInfo['gender'])}
                    className="w-full rounded-md border border-border px-3 py-2 text-text"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>

            <Input
                label="Birth date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <Input label="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
            <Input label="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />

            <label className="mb-4 block text-sm">
                <span className="mb-1 block text-text-faint">Marital status</span>
                <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as PersonalInfo['maritalStatus'])}
                    className="w-full rounded-md border border-border px-3 py-2 text-text"
                >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                </select>
            </label>

            <Input
                label="Emergency contact"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
            />

            {error && <p className="mb-4 text-sm text-danger">Failed to save changes</p>}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save'}
            </SubmitButton>
        </form>
    )
}