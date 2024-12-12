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
mutation SignUp($input: CreateUserInput) {
  signUp(input: $input) {
    accessToken
    refreshToken
  }
}
`

export const REFRESH_TOKEN = gql`
mutation refreshToken {
  refreshToken{
    accessToken
    refreshToken
  }
}
`