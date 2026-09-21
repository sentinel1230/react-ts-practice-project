import { ContactInfoCard } from '../../../../entities/user/ui/ContactInfoCard'
import type { UserProfile } from '../../../../entities/user/model/types'

type EditableSection = 'contactInfo' | 'personalInfo' | 'insuranceInfo'

type Props = {
    profile: UserProfile
    onEdit: (section: EditableSection) => void
}

export function ProfileGrid({ profile, onEdit }: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ContactInfoCard data={profile.contactInfo} onEdit={() => onEdit('contactInfo')} />
        </div>
    )
}