import { gql } from "@apollo/client";

export const VIEW_USER_PROFILE = gql`
  query user($uuid: UUID){
      user(uuid: $uuid){
          name
          email
          createdAt
          updatedAt
      }
  }
`

export const UPDATE_USER_PROFILE = gql`
  mutation updateUser($input: UpdateUserInput!){
      updateUser(input: $input){
          name
          email
          createdAt
          updatedAt
      }
  }
`