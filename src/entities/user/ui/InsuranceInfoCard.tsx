import { Pencil } from 'lucide-react'
import type { InsuranceInfo } from '../model/types'
import { Field } from '../../../shared/ui/Field'

type Props = {
    data: InsuranceInfo | undefined
    onEdit: () => void
}

export function InsuranceInfoCard({ data, onEdit }: Props) {
    return (
        <div className="rounded-lg border border-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-text">Insurance Info</h3>
                <button onClick={onEdit} aria-label="Edit" className="text-text-faint hover:text-text cursor-pointer">
                    <Pencil size={16} />
                </button>
            </div>

            {data ? (
                <dl className="space-y-3 text-sm">
                    <Field label="Member ID" value={data.memberId} />
                    <Field label="Insurance Provider" value={data.insuranceProvider} />
                </dl>
            ) : (
                <p className="text-sm text-text-faint">Data not yet filled</p>
            )}
        </div>
    )
}