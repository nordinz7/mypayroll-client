import { convertToCsv } from "@/components/shared/importExportData/entities/helper"
import { GET_EMPLOYEES } from "@/pages/employees"
import { apolloClientSingleton } from "@/utils/singletons/apolloClient"

export const employeeEntity = {
  export: async () => {
    const client = apolloClientSingleton.getInstance()
    const res = await client.query({
      query: GET_EMPLOYEES,
      variables: { input: {}}
    })

    const employees = res.data.employees.rows
    convertToCsv(employees, 'employees.csv')
  },
  import: async () => {}
}