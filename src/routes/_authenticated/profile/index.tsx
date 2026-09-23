import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useCurrentUser } from '../../../entities/user/model/useCurrentUser'
import { useUserProfile } from '../../../entities/user/model/useUserProfile'
import { ProfileGrid } from './-components/ProfileGrid'
import { Modal } from '../../../shared/ui/Modal'

import { EditContactInfoForm } from '../../../features/profile-edit-contact-info'
import { EditPersonalInfoForm } from '../../../features/profile-edit-personal-info'
import { EditInsuranceInfoForm } from '../../../features/profile-edit-insurance-info'
import { AddAppointmentForm } from '../../../features/profile-add-appointment'

import { Avatar } from '../../../shared/ui/Avatar'

type EditableSection = 'contactInfo' | 'personalInfo' | 'insuranceInfo' | null

export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoading: authLoading } = useCurrentUser()
  const { data: profile, isLoading: profileLoading } = useUserProfile(user?.uid)
  const [editingSection, setEditingSection] = useState<EditableSection>(null)
  const [isAddingAppointment, setIsAddingAppointment] = useState(false)

  if (authLoading || profileLoading) return <div>Loading...</div>
  if (!user || !profile) return <div>You are not authorized</div>

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Avatar firstName={profile.firstName} lastName={profile.lastName} size='lg' />
        <div>
          <h1 className="text-lg font-bold text-text">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm text-text-faint">Patient</p>
        </div>
      </div>
      <div className="border-b border-gray-200 px-5 sm:px-6 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <span className="px-1 py-4 text-lg">
            Summary
          </span>
        </nav>
      </div>

      <ProfileGrid profile={profile} onEdit={setEditingSection} onAddAppointment={() => setIsAddingAppointment(true)} />

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

      <Modal
        isOpen={isAddingAppointment}
        onClose={() => setIsAddingAppointment(false)}
        title="Add appointment"
      >
        <AddAppointmentForm uid={user.uid} onSuccess={() => setIsAddingAppointment(false)} />
      </Modal>
    </div>
  )
}