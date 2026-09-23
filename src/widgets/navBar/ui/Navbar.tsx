import { Menu } from 'lucide-react'
import hCareLogo from '../../../assets/Hcare-logo.svg'

type Props = {
    onMenuClick: () => void
}

export function Navbar({ onMenuClick }: Props) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-border bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="text-text-muted hover:text-text cursor-pointer"
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>

                <div className="flex items-center gap-2">
                    <span className="flex h-6.5 w-6.5 items-center justify-center">
                        <img src={hCareLogo} alt="HCare Logo" className="h-7 w-7" />
                    </span>
                    <span className="text-base font-bold tracking-tight text-logo">HCare</span>
                </div>
            </div>
        </header>
    )
}