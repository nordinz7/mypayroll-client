import { authStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { User } from "@/types/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const TIMEOUT = 500;

const delay = (fn: () => void, timeout: number = 0) =>
  setTimeout(fn, timeout ?? TIMEOUT);

const AuthLayout = () => {
  const token = authStore((state) => state.token);
  const refreshToken = authStore((state) => state.refreshToken);
  const tokenExpiry = authStore((state) => state.tokenExpiry);
  const setUser = authStore((state) => state.setUser);
  const setTokenExpiry = authStore((state) => state.setTokenExpiry);
  const isStartLoggingOut = authStore((state) => state.isStartLoggingOut);
  const logOut = authStore((state) => state.logOut);

  const [loadingText, setLoadingText] = useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (exp: number) => {
    return Date.now() >= exp;
  };

  const logOutFn = (loadingTxt?: string, tm?: number) => {
    loadingTxt && setLoadingText(loadingTxt);

    delay(() => {
      logOut();
      setLoading(false);
      navigate("/login");
    }, tm);
  };

  const verifySetTokenSetUser = (
    token?: string | null,
    refreshToken?: string | null,
    tokenExpiry: {
      accessToken: number | null | undefined;
      refreshToken: number | null | undefined;
    } = { accessToken: null, refreshToken: null }
  ) => {
    if (!token || !refreshToken) {
      return navigate("/login");
    }

    const oldTokenExpiry = { ...tokenExpiry };

    let user: User | null = null;
    let accessTokenExp = tokenExpiry.accessToken || 0;
    let refreshTokenExp = tokenExpiry.refreshToken || 0;

    if (!accessTokenExp) {
      const decoded = jwtDecode<{ user: User } & JwtPayload>(token);
      accessTokenExp = (decoded?.exp || 0) * 1000;
      user = decoded?.user;
    }

    if (!refreshTokenExp) {
      refreshTokenExp = (jwtDecode<JwtPayload>(refreshToken)?.exp || 0) * 1000;
    }

    if (isTokenExpired(accessTokenExp) || isTokenExpired(refreshTokenExp)) {
      return logOutFn("Session expired. Logging out...", 1500);
    }

    if (
      oldTokenExpiry.accessToken !== accessTokenExp &&
      oldTokenExpiry.refreshToken !== refreshTokenExp
    ) {
      const obj = {
        ...tokenExpiry,
        ...(accessTokenExp && { accessToken: accessTokenExp }),
        ...(refreshTokenExp && {
          refreshToken: refreshTokenExp,
        }),
      };
      setUser(user);
      setTokenExpiry(obj);
    } else if (oldTokenExpiry.accessToken !== accessTokenExp) {
      setUser(user);
      setTokenExpiry({ ...tokenExpiry, accessToken: accessTokenExp });
    } else if (oldTokenExpiry.refreshToken !== refreshTokenExp) {
      setTokenExpiry({ ...tokenExpiry, refreshToken: refreshTokenExp });
    }

    delay(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isStartLoggingOut) {
      delay(() => {
        logOutFn();
      });
      return;
    }

    verifySetTokenSetUser(token, refreshToken, tokenExpiry);
  }, [token, refreshToken, isStartLoggingOut, tokenExpiry]);

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
        <LoadingSpinner text={loadingText} />
      </div>
    );
  }

  return <Outlet />;
};

export default AuthLayout;
