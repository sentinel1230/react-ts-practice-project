import { Pencil } from 'lucide-react'
import { Field } from '../../../shared/ui/Field'
import type { ContactInfo } from '../model/types'

type Props = {
  data: ContactInfo | undefined
  onEdit: () => void
}

export function ContactInfoCard({ data, onEdit }: Props) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-text">Contact info</h3>
        <button onClick={onEdit} aria-label="Edit" className="text-text-faint hover:text-text cursor-pointer">
          <Pencil size={16} />
        </button>
      </div>

      {data ? (
        <dl className="space-y-3 text-sm">
          <Field label="Full Name" value={data.fullName} />
          <Field label="Phone" value={data.phone} />
          <Field label="Email" value={data.email} />
        </dl>
      ) : (
        <p className="text-sm text-text-faint">Data not yet filled</p>
      )}
    </div>
  )
}