"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ImSpinner3 } from "react-icons/im";
import { FaGithub } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { USER_SIGN_IN, USER_SIGN_UP } from "@/components/auth/schema"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/stores/useAuth"
import { useNavigate } from "react-router-dom"
import { ToastAction } from "@/components/ui/toast"
import { Typography } from "@/components/ui/typography"

export enum UserAuthFormMode {
  SignIn = "SignIn",
  SignUp = "SignUp",
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: UserAuthFormMode
}

export function UserAuthForm({ className, mode = UserAuthFormMode.SignIn ,...props }: UserAuthFormProps) {
  const [formValues, setFormValues] = React.useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  })
  const setToken = useAuth((state) => state.setToken)
  const isSignUp = mode === UserAuthFormMode.SignUp
  const navigate = useNavigate()

  const {toast} = useToast()

  const [signIn, {loading}] = useMutation(USER_SIGN_IN,
    {
    onCompleted: (data) => {
      if (data?.signIn?.jwt) {
        toast({
          title: "Login Success",
          description: "You have successfully logged in! Redirecting to employees page."
        })

        setTimeout(() => {
          navigate("/")
        }, 1000)
      }
      setToken(data?.signIn?.jwt)
  },
  onError: (error) => {
    toast({
      title: "Error",
      description: error.message,
      action: <ToastAction onClick={() => {
        if (error.message === "User not found"){
          navigate("/signup")}
      }} altText="Sign up">{error.message === 'User not found' ? 'Sign up': 'Sign In'}</ToastAction>
    })
  }
}
)
  const [signUp, {loading: signUpLoading}] = useMutation(USER_SIGN_UP, {
    onCompleted: (data) => {
      if (data.createUser.uuid){
        toast({
          title: "Success",
          description: "User created successfully! please sign in again"
        })

        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      })
    }

  })

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    const mutation = isSignUp ? signUp : signIn

    const input = {...formValues}

    if (!isSignUp) { //@ts-ignore
      delete input?.name //@ts-ignore
      delete input?.confirmPassword
    }

     await mutation({
        variables: {
          input
        },
      })

  }

  return (
    <>
    <div className={cn("grid", className, 'flex-col justify-center items-center h-[100vh]')} {...props}>
      <Typography type="h1" text="myPayroll" />
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {isSignUp && <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={loading || signUpLoading}
              value={formValues.name}
              onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading || signUpLoading}
              value={formValues.email}
              onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*********"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={loading || signUpLoading}
              value={formValues.password}
              onChange={(e) => setFormValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          {isSignUp && <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="*********"
              type="confirmPassword"
              autoCapitalize="none"
              autoComplete="confirmPassword"
              autoCorrect="off"
              disabled={loading || signUpLoading}
              value={formValues.confirmPassword}
              onChange={(e) => setFormValues((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }
            />
          </div>}
          <Button disabled={loading || signUpLoading}>
            {loading || signUpLoading && (
              <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={loading}>
        {loading ? (
          <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
    </>
  )
}