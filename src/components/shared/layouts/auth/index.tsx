import { authStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { User } from "@/types/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "@/components/auth/schema";

const TIMEOUT = 500;

const delay = (fn: () => void, timeout: number = 0) =>
  setTimeout(fn, timeout ?? TIMEOUT);

const AuthLayout = () => {
  const token = authStore((state) => state.token);
  const refreshToken = authStore((state) => state.refreshToken);
  const tokenExpiry = authStore((state) => state.tokenExpiry);
  const setToken = authStore((state) => state.setToken);
  const setRefreshToken = authStore((state) => state.setRefreshToken);
  const setUser = authStore((state) => state.setUser);
  const setTokenExpiry = authStore((state) => state.setTokenExpiry);
  const isStartLoggingOut = authStore((state) => state.isStartLoggingOut);
  const logOut = authStore((state) => state.logOut);

  const [loadingText, setLoadingText] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [refreshTokenRoutine, { loading: refreshTokenLoading }] = useMutation(
    REFRESH_TOKEN,
    {
      onCompleted: (data) => {
        const { accessToken, refreshToken } = data.refreshToken;
        verifySetTokenSetUser(accessToken, refreshToken);
      },
      onError: (err) => {
        const resErr = err.graphQLErrors
          .map((error) => error.message)
          .join(",");
        console.error(resErr);
        logOutFn(
          `Error occurred when refreshing session. Logging out...${resErr}`,
          1500
        );
      },
    }
  );

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

  const verifySetTokenSetUser = async (
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
    let accessTokenExp = oldTokenExpiry.accessToken || 0;
    let refreshTokenExp = oldTokenExpiry.refreshToken || 0;

    if (!accessTokenExp) {
      const decoded = jwtDecode<{ user: User } & JwtPayload>(token);
      accessTokenExp = (decoded?.exp || 0) * 1000;
      user = decoded?.user;
    }

    if (!refreshTokenExp) {
      refreshTokenExp = (jwtDecode<JwtPayload>(refreshToken)?.exp || 0) * 1000;
    }

    if (isTokenExpired(accessTokenExp)) {
      setLoadingText("Refreshing session...");
      await refreshTokenRoutine();
    }

    if (isTokenExpired(refreshTokenExp)) {
      return logOutFn("Session expired. Logging out...", 1500);
    }

    if (
      oldTokenExpiry.accessToken !== accessTokenExp &&
      oldTokenExpiry.refreshToken !== refreshTokenExp
    ) {
      const obj = {
        ...oldTokenExpiry,
        ...(accessTokenExp && { accessToken: accessTokenExp }),
        ...(refreshTokenExp && {
          refreshToken: refreshTokenExp,
        }),
      };
      setToken(token);
      setRefreshToken(refreshToken);
      setUser(user);
      setTokenExpiry(obj);
    } else if (oldTokenExpiry.accessToken !== accessTokenExp) {
      setToken(token);
      setUser(user);
      setTokenExpiry({ ...oldTokenExpiry, accessToken: accessTokenExp });
    } else if (oldTokenExpiry.refreshToken !== refreshTokenExp) {
      setRefreshToken(refreshToken);
      setTokenExpiry({ ...oldTokenExpiry, refreshToken: refreshTokenExp });
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
