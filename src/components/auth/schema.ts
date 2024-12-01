import { gql } from "@apollo/client";

export const USER_SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`

export const USER_SIGN_UP = gql`
mutation createUser($input: CreateUserInput) {
  createUser(input: $input) {
    accessToken
    refreshToken
  }
}
`