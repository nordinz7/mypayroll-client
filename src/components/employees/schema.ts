import { gql } from "@apollo/client"

export const VIEW_EMPLOYEE = gql`
  query employee($id: Int!){
    employee(id: $id){
      id
      name
      birthDate
      # nationality
      religion
      race
      martialStatus
      qualification
      educationLevel

      spouseName
      spouseOccupation
      children

      joinDate
      endDate
      phone
      email

      enumerationId

      createdAt
      updatedAt
    }
  }
`
export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($input: EmployeeInput!){
    createEmployee(input: $input){
      id
  }
}
`
export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($id: Int!, $input: EmployeeInput!){
    updateEmployee(id: $id, input: $input){
      id
  }
}
`