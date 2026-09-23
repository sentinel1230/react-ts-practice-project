import type { PersonalInfo } from '../model/types'
import { Field } from '../../../shared/ui/Field'
import { Pencil } from 'lucide-react'

type Props = {
    data: PersonalInfo | undefined
    onEdit: () => void
}

export function PersonalInfoCard({ data, onEdit }: Props) {
    return (
        <div className="rounded-lg border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-text">Personal Info</h3>
                <button onClick={onEdit} aria-label="Edit" className="text-text-faint hover:text-text cursor-pointer">
                    <Pencil size={16} />
                </button>
            </div>

            {data ? (
                <dl className="space-y-3 text-sm">
                    <Field label="Gender" value={capitalize(data.gender)} />
                    <Field label="Birth (Age)" value={formatBirthDate(data.birthDate)} />
                    <Field label="Patient ID" value={data.patientId} />
                    <Field label="Nationality" value={data.nationality} />
                    <Field label="Marital status" value={capitalize(data.maritalStatus)} />
                    <Field label="Emergency contact" value={data.emergencyContact} />
                </dl>
            ) : (
                <p className="text-sm text-text-faint">Data not yet filled</p>
            )}
        </div>
    )
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatBirthDate(birthDate: string) {
    if (!birthDate) return '—'
    const date = new Date(birthDate)
    const age = calculateAge(date)
    return `${date.toLocaleDateString('en-GB')} (${age})`
}

function calculateAge(birthDate: Date) {
    const diff = Date.now() - birthDate.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}