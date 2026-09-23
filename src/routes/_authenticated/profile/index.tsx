import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useCurrentUser } from '../../../entities/user/model/useCurrentUser'
import { useUserProfile } from '../../../entities/user/model/useUserProfile'
import { ProfileGrid } from './-components/ProfileGrid'
import { Modal } from '../../../shared/ui/Modal'

import { EditContactInfoForm } from '../../../features/profile-edit-contact-info'
import { EditPersonalInfoForm } from '../../../features/profile-edit-contact-info'
import { EditInsuranceInfoForm } from '../../../features/profile-edit-contact-info'

type EditableSection = 'contactInfo' | 'personalInfo' | 'insuranceInfo' | null

export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoading: authLoading } = useCurrentUser()
  const { data: profile, isLoading: profileLoading } = useUserProfile(user?.uid)
  const [editingSection, setEditingSection] = useState<EditableSection>(null)

  if (authLoading || profileLoading) return <div>Loading...</div>
  if (!user || !profile) return <div>You are not authorized</div>

  return (
    <div>
      <h1>Profile</h1>
      <ProfileGrid profile={profile} onEdit={setEditingSection} />

      <Modal
        isOpen={editingSection === 'contactInfo'}
        onClose={() => setEditingSection(null)}
        title="Edit contact info"
      >
        <EditContactInfoForm
          uid={user.uid}
          initialData={profile.contactInfo}
          onSuccess={() => setEditingSection(null)}
        />
      </Modal>

      <Modal
        isOpen={editingSection === 'personalInfo'}
        onClose={() => setEditingSection(null)}
        title="Edit personal info"
      >
        <EditPersonalInfoForm
          uid={user.uid}
          initialData={profile.personalInfo}
          onSuccess={() => setEditingSection(null)}
        />
      </Modal>

      <Modal
        isOpen={editingSection === 'insuranceInfo'}
        onClose={() => setEditingSection(null)}
        title="Edit insurance info"
      >
        <EditInsuranceInfoForm
          uid={user.uid}
          initialData={profile.insuranceInfo}
          onSuccess={() => setEditingSection(null)}
        />
      </Modal>
    </div>
  )
}