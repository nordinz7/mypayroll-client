import { UserProfileForm } from '@/components/userProfile'
import { FormMode } from '@/types/customGlobalTypes'
import { useParams } from 'react-router-dom'

const ViewUserProfile = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <UserProfileForm mode={FormMode.update} userId={id} />
  )
}

export default ViewUserProfile