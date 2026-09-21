import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useCurrentUser } from '../../../entities/user/useCurrentUser'
import { useUserProfile } from '../../../entities/user/useUserProfile'
import { ProfileGrid } from './-components/ProfileGrid'
import { Modal } from '../../../shared/ui/Modal'
import { EditContactInfoForm } from '../../../features/profile-edit-contact-info'
import { useLogout } from '../../../entities/user/useLogout'

type EditableSection = 'contactInfo' | 'personalInfo' | 'insuranceInfo' | null

export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoading: authLoading } = useCurrentUser()
  const { data: profile, isLoading: profileLoading } = useUserProfile(user?.uid)
  const [editingSection, setEditingSection] = useState<EditableSection>(null)
  const { mutate: logout, isPending: isLoggingOut } = useLogout()

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

      <button onClick={() => logout()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}