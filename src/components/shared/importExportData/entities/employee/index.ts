import { convertToCsv } from "@/components/shared/importExportData/entities/helper"
import { GET_EMPLOYEES } from "@/pages/employees"
import { ApolloClient } from "@apollo/client"

export const employeeEntity = {
  export: async (client: ApolloClient<any>) => {
    const res = await client.query({
      query: GET_EMPLOYEES,
      variables: { input: {}}
    })

    const employees = res.data.employees.rows
    convertToCsv(employees, 'employees.csv')
  },
  import: async () => {}
}