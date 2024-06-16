import { DataTableDemo } from '@/components/employees'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Theme, useTheme } from '@/stores/useTheme'
import { UserAuthForm } from '@/components/auth'

const GET_EMPLOYEES = gql`
query emps($input: EmployeesQueryInput) {
  employees(input: $input) {
    rows {
      name
      id
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
  const { data, loading } = useQuery(GET_EMPLOYEES, { variables: { input: { limit: 10, offset: 0 } } })
  return (
   <DataTableDemo />
  )
}

export default index