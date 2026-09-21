import { Pencil } from 'lucide-react'
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
        <button onClick={onEdit} aria-label="Edit" className="text-text-faint hover:text-text">
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-text-faint">{label}</dt>
      <dd className="text-text">{value || '—'}</dd>
    </div>
  )
}