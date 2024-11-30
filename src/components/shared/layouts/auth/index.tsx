import { authStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { User } from "@/types/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const TIMEOUT = 1000;

const delay = (fn: () => void) => setTimeout(fn, TIMEOUT);

const AuthLayout = () => {
  const token = authStore((state) => state.token);
  const refreshToken = authStore((state) => state.refreshToken);
  const setUser = authStore((state) => state.setUser);
  const setToken = authStore((state) => state.setToken);
  const setRefreshToken = authStore((state) => state.setRefreshToken);
  const isStartLoggingOut = authStore((state) => state.isStartLoggingOut);
  const logOut = authStore((state) => state.logOut);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (exp: number) => {
    return Date.now() >= exp * 1000;
  };

  const verifySetTokenSetUser = (token?: string | null) => {
    if (!token) {
      return navigate("/login");
    }

    const decodedToken = jwtDecode<{ user: User } & JwtPayload>(token);

    if (isTokenExpired(decodedToken.exp || 0)) {
      return delay(() => {
        setToken(null);
        setUser(null);
        setRefreshToken(null);
        setLoading(false);
        navigate("/login");
      });
    }

    setUser(decodedToken.user);

    delay(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isStartLoggingOut) {
      delay(() => {
        logOut();
      });
      return;
    }

    verifySetTokenSetUser(token);
  }, [token, refreshToken, isStartLoggingOut]);

  if (loading || isStartLoggingOut) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingSpinner text={loading ? undefined : "Logging out"} />
      </div>
    );
  }

  return <Outlet />;
};

export default AuthLayout;
