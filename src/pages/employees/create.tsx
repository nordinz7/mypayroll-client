import { EmployeeForm } from '@/components/employees/form'
import { FormMode } from '@/types/customGlobalTypes'

const CreateEmployee = () => {
  return (
    <EmployeeForm mode={FormMode.create} />
  )
}

export default CreateEmployee