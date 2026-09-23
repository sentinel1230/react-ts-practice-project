import { useState } from 'react'
import { useAddAppointment } from '../model/useAddAppointment'
import { Input } from '../../../shared/ui/Input'
import { SubmitButton } from '../../../shared/ui/Button'
import type { Appointment } from '../../../entities/user'

type Props = {
    uid: string
    onSuccess: () => void
}

export function AddAppointmentForm({ uid, onSuccess }: Props) {
    const [startTime, setStartTime] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [status, setStatus] = useState<Appointment['status']>('confirmed')

    const { mutate, isPending, error } = useAddAppointment(uid)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate({ startTime, speciality, status }, { onSuccess })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Start time"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <Input label="Speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} />

            <label className="mb-4 block text-sm">
                <span className="mb-1 block text-text-faint">Status</span>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Appointment['status'])}
                    className="w-full rounded-md border border-border px-3 py-2 text-text"
                >
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </label>

            {error && <p className="mb-4 text-sm text-danger">Failed to add appointment</p>}

            <SubmitButton type="submit" disabled={isPending}>
                {isPending ? 'Adding...' : 'Add appointment'}
            </SubmitButton>
        </form>
    )
}