import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { DataTableDemo } from '@/components/employees'
import './App.css'

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

function App () {
  const [count, setCount] = useState(0)
  const { data, loading } = useQuery(GET_EMPLOYEES, { variables: { input: { limit: 10, offset: 0 } } })

  console.log('--------data', data)

  return (
    <DataTableDemo />
  )
}

export default App
