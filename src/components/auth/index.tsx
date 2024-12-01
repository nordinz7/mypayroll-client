"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ImSpinner3 } from "react-icons/im";
import { authStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { Typography } from "@/components/ui/typography";
import { ThemeToggle } from "@/components/shared/theme-switcher";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMutation } from "@apollo/client";
import { USER_SIGN_IN, USER_SIGN_UP } from "@/components/auth/schema";

export enum UserAuthFormMode {
  SignIn = "SignIn",
  SignUp = "SignUp",
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: UserAuthFormMode;
}

export function UserAuthForm({
  className,
  mode = UserAuthFormMode.SignIn,
  ...props
}: UserAuthFormProps) {
  const [formValues, setFormValues] = React.useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const setToken = authStore((state) => state.setToken);
  const setRefreshToken = authStore((state) => state.setRefreshToken);
  const isSignUp = mode === UserAuthFormMode.SignUp;
  const navigate = useNavigate();

  const onSuccess = (data: any) => {
    const key = isSignUp ? "signUp" : "signIn";
    const d = data[key];
    setToken(d.accessToken);
    setRefreshToken(d.refreshToken);

    setTimeout(() => navigate("/"), 500);
  };

  const onError = (error: any) => {
    console.error(error);
  };

  const [signIn, { loading: signInLoading }] = useMutation(USER_SIGN_IN, {
    onCompleted: onSuccess,
    onError: onError,
  });
  const [signUp, { loading: signUpLoading }] = useMutation(USER_SIGN_UP, {
    onCompleted: onSuccess,
    onError: onError,
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const mutation = isSignUp ? signUp : signIn;

    const input = { ...formValues };

    if (!isSignUp) {
      //@ts-ignore
      delete input?.name; //@ts-ignore
      delete input?.confirmPassword;
    }

    await mutation({ variables: { input } });
  }

  if (signInLoading || signUpLoading) {
    <LoadingSpinner />;
  }

  return (
    <>
      <div
        className={cn(
          "grid",
          className,
          "flex-col justify-center items-center h-[100vh] text-slate-950 dark:bg-slate-950 dark:text-slate-50"
        )}
        {...props}
      >
        <Typography type="h1" text="myPayroll" />
        <span className="absolute top-5 right-5">
          <ThemeToggle />
        </span>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            {isSignUp && (
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="name">
                  name
                </Label>
                <Input
                  id="name"
                  placeholder="Name"
                  type="name"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={signInLoading || signUpLoading}
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            )}
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={signInLoading || signUpLoading}
                value={formValues.email}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={signInLoading || signUpLoading}
                value={formValues.password}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            {isSignUp && (
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="confirmPassword"
                  autoCapitalize="none"
                  autoComplete="confirmPassword"
                  autoCorrect="off"
                  disabled={signInLoading || signUpLoading}
                  value={formValues.confirmPassword}
                  onChange={(e) =>
                    setFormValues((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
            )}
            <Button
              variant="ghost"
              type="submit"
              disabled={signInLoading || signUpLoading}
            >
              {signInLoading ||
                (signUpLoading && (
                  <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />
                ))}
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </form>
        <span className="w-full border-t" />
        <Button
          variant="ghost"
          type="button"
          disabled={signInLoading || signUpLoading}
          onClick={() => navigate(`/${isSignUp ? "login" : "signup"}`)}
        >
          {signInLoading ||
            (signUpLoading && (
              <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />
            ))}
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </>
  );
}
