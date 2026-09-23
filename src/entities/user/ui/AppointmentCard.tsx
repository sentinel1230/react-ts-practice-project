import { Plus } from 'lucide-react'
import type { Appointment } from '../model/types'

type Props = {
    appointments: Appointment[] | undefined
    onAdd: () => void
}

export function AppointmentCard({ appointments, onAdd }: Props) {
    return (
        <div className="rounded-lg border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-text">Appointments</h3>
                <button
                    onClick={onAdd}
                    aria-label="Add appointment"
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-text-faint hover:text-text"
                >
                    <Plus size={14} />
                </button>
            </div>

            {appointments && appointments.length > 0 ? (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-xs text-text-faint">
                            <th className="pb-2 font-medium">Start Time</th>
                            <th className="pb-2 font-medium">Speciality</th>
                            <th className="pb-2 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, i) => (
                            <tr key={i} className="border-t border-border">
                                <td className="py-2 text-text">
                                    {new Date(appt.startTime).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </td>
                                <td className="py-2 text-text-muted">{appt.speciality}</td>
                                <td
                                    className={`py-2 font-medium ${appt.status === 'confirmed' ? 'text-primary' : 'text-danger'
                                        }`}
                                >
                                    {appt.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm text-text-faint">No appointments yet</p>
            )}
        </div>
    )
}