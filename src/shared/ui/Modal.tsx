import { type ReactNode } from 'react'
import { X } from 'lucide-react'

type Props = {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    children: ReactNode,
}

export function Modal({ isOpen, onClose, title, children }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-text">{title}</h2>
                    <button onClick={onClose} className="text-text-faint hover:text-text" aria-label="Close">
                        <X size={18} strokeWidth={1.8} className="text-text-faint hover:text-text cursor-pointer" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}