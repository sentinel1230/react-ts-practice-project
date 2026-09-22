const COLORS = [
    'bg-emerald-100 text-emerald-700',
    'bg-blue-100 text-blue-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-violet-100 text-violet-700',
    'bg-cyan-100 text-cyan-700',
]

function getColorForName(name: string) {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return COLORS[hash % COLORS.length]
}

type Props = {
    firstName: string
    lastName: string
    size?: 'sm' | 'md'
}

export function Avatar({ firstName, lastName, size = 'md' }: Props) {
    const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()
    const colorClasses = getColorForName(firstName + lastName)
    const sizeClasses = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'

    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClasses} ${colorClasses}`}
        >
            {initials || '?'}
        </div>
    )
}