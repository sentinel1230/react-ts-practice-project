type Field = {
    label: string,
    value: string,
}

export function Field({ label, value }: Field) {
    return (
        <div>
            <dt className="text-xs text-text-faint">{label}</dt>
            <dd className="text-text">{value || '—'}</dd>
        </div>
    )
}