import { EmployeeForm } from '@/components/employees/form'
import { FormMode } from '@/types/customGlobalTypes'
import { useParams } from 'react-router-dom'

const ViewEmployee = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <EmployeeForm mode={FormMode.update} employeeId={id} />
  )
}

export default ViewEmployee