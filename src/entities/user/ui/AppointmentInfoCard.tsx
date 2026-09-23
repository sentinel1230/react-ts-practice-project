import { Plus } from 'lucide-react'
import type { Appointment } from '../model/types'

type Props = {
    data: Appointment[]
    onAdd?: () => void
}

export function AppointmentsInfoCard({ data, onAdd }: Props) {
    return (
        <div className="rounded-lg border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-text">Appointments</h3>
                {onAdd && (
                    <button onClick={onAdd} aria-label="Add appointment" className="text-text-faint hover:text-text">
                        <Plus size={16} />
                    </button>
                )}
            </div>

            {data.length === 0 ? (
                <p className="text-sm text-text-faint">No appointments yet</p>
            ) : (
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-xs text-text-faint">
                            <th className="pb-2 font-normal">Start Time</th>
                            <th className="pb-2 font-normal">Speciality</th>
                            <th className="pb-2 font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((appointment, index) => (
                            <tr key={index} className="border-t border-border/60">
                                <td className="py-2 text-text">{appointment.startTime}</td>
                                <td className="py-2 text-text-muted">{appointment.speciality}</td>
                                <td className="py-2">
                                    <StatusBadge status={appointment.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

function StatusBadge({ status }: { status: Appointment['status'] }) {
    const isConfirmed = status === 'confirmed'
    return (
        <span className={isConfirmed ? 'text-success' : 'text-danger'}>
            {isConfirmed ? 'Confirmed' : 'Cancelled'}
        </span>
    )
}