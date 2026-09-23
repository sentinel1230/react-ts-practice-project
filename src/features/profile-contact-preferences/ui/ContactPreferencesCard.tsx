import { useContactPreference } from '../model/useContactPreference'
import type { ContactChannel, ContactPreferences } from '../../../entities/user'

const CHANNEL_LABELS: Record<ContactChannel, string> = {
    email: 'Email',
    mobilePhone: 'Mobile Phone',
    mail: 'Mail',
}

type Props = {
    uid: string
    data: ContactPreferences | undefined
}

export function ContactPreferencesCard({ uid, data }: Props) {
    const { mutate } = useContactPreference(uid)

    const preferences: ContactPreferences = data ?? { email: false, mobilePhone: false, mail: false }

    return (
        <div className="rounded-lg border border-border bg-white p-5">
            <h3 className="mb-4 font-semibold text-text">Contact preferences</h3>

            <div className="mb-2 flex justify-between text-xs text-text-faint">
                <span>Contact Method</span>
            </div>

            <div className="space-y-3">
                {(Object.keys(CHANNEL_LABELS) as ContactChannel[]).map((channel) => (
                    <div key={channel} className="flex items-center justify-between">
                        <span className="text-sm text-text">{CHANNEL_LABELS[channel]}</span>
                        <div className="flex items-center gap-3 text-xs">
                            <span
                                className={`w-10 text-right ${!preferences[channel] ? 'font-medium text-danger' : 'text-text-faint'
                                    }`}
                            >
                                DENY
                            </span>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={preferences[channel]}
                                onClick={() => mutate({ channel, value: !preferences[channel] })}
                                className={`flex h-5 w-9 shrink-0 items-center rounded-full border-0 p-0.5 outline-none cursor-pointer transition-colors ${preferences[channel] ? 'justify-end bg-primary' : 'justify-start bg-gray-200'
                                    }`}
                            >
                                <span className="block h-4 w-4 rounded-full bg-white shadow-sm" />
                            </button>

                            <span
                                className={`w-10 text-left ${preferences[channel] ? 'font-medium text-primary' : 'text-text-faint'
                                    }`}
                            >
                                ALLOW
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}