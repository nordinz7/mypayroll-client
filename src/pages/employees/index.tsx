import { EmployeeTable } from '@/components/employees'
import { gql, useQuery } from '@apollo/client'

const GET_EMPLOYEES = gql`
query emps($input: EmployeesQueryInput) {
  employees(input: $input) {
    rows {
      birthDate
      children
      createdAt
      educationLevel
      email
      endDate
      # enumeration
      enumerationId
      id
      joinDate
      martialStatus
      name
      nationality
      phone
      # qualification
      # race
      # religion
      # spouseName
      # spouseOccupation
      # updatedAt
    }
    pagination{
      count
      limit
      offset
    }
  }
}
`


const index = () => {
  const { data, loading } = useQuery(GET_EMPLOYEES, { variables: { input: { limit: 10, offset: 0, q: '' } } })

  return (
    <EmployeeTable data={data?.employees?.rows || []} />
  )
}

export default index