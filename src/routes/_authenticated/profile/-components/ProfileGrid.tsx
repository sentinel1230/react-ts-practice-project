import {
    ContactInfoCard,
    PersonalInfoCard,
    InsuranceInfoCard
} from '../../../../entities/user'

import type { UserProfile } from '../../../../entities/user/model/types'

type EditableSection = 'contactInfo' | 'personalInfo' | 'insuranceInfo'

type Props = {
    profile: UserProfile
    onEdit: (section: EditableSection) => void
}

export function ProfileGrid({ profile, onEdit }: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="space-y-4">
                <ContactInfoCard data={profile.contactInfo} onEdit={() => onEdit('contactInfo')} />
                <PersonalInfoCard data={profile.personalInfo} onEdit={() => onEdit('personalInfo')} />
            </div>

            <div className="space-y-4">
                <InsuranceInfoCard data={profile.insuranceInfo} onEdit={() => onEdit('insuranceInfo')} />
            </div>
        </div>
    )
}