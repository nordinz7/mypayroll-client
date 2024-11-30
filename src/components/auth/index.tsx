"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ImSpinner3 } from "react-icons/im";
import { useToast } from "@/components/ui/use-toast";
import { authStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { Typography } from "@/components/ui/typography";
import { ThemeToggle } from "@/components/shared/theme-switcher";
import { request } from "@/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
  const [loading, setLoading] = React.useState(false);
  const setToken = authStore((state) => state.setToken);
  const setRefreshToken = authStore((state) => state.setRefreshToken);
  const isSignUp = mode === UserAuthFormMode.SignUp;
  const navigate = useNavigate();
  const { toast } = useToast();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setLoading(true);

    const mutationUrl = `http://localhost:8000/api/public/auth/${
      isSignUp ? "register" : "login"
    }`;

    const input = { ...formValues };

    if (!isSignUp) {
      //@ts-ignore
      delete input?.name; //@ts-ignore
      delete input?.confirmPassword;
    }

    try {
      const res = await request.post(mutationUrl, input);
      if (res.accessToken && res.refreshToken) {
        toast({
          title: "Success",
          description: ` ${
            isSignUp
              ? "User created successfully! signing in..."
              : "You have successfully logged in! Redirecting to employees page."
          }`,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);

        setToken(res.accessToken);
        setRefreshToken(res.refreshToken);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
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
                  disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
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
            <Button variant="ghost" type="submit" disabled={loading}>
              {loading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </form>
        <span className="w-full border-t" />
        <Button
          variant="ghost"
          type="button"
          disabled={loading}
          onClick={() => navigate(`/${isSignUp ? "login" : "signup"}`)}
        >
          {loading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </>
  );
}
