import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoginForm from "../components/SignInAsset/LoginForm/LoginForm";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import useFetch from "../hook/use-fetch";
import checkValidPassword from "../components/SignInAsset/CheckValidPassword/CheckValidPassword";
import { loginUrl } from "../config/url";
import { HOME_PAGE } from "../components/link/link";
import { useDispatch } from "react-redux";
import { NotifyActions } from "../components/store/NotifyAfterLogin/NotifyAfterLogin";
import { isAuthActions } from "../components/store/IsAuth/is-auth";
const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const route = useRouteMatch();
  const {
    getDataFromServerHandler,
    data: dataSignIn,
    error,
    isLoading,
    status,
    resetAllHandler,
  } = useFetch();
  const getUserFromInput = (userData) => {
    if (
      !userData.email.includes("@") ||
      !checkValidPassword(userData.password)
    ) {
      return;
    }
    resetAllHandler();
    getDataFromServerHandler({
      url: loginUrl,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    });
  };
  useEffect(() => {
    if (error || isLoading) {
      return;
    }
    if (!isLoading && dataSignIn && !error) {
      const { token, expiry } = dataSignIn;
      localStorage.setItem("token/customer", token);
      localStorage.setItem("expiry/customer", expiry);
      dispatch(isAuthActions.setIsAuthenticated(token));
      dispatch(
        NotifyActions.showedNotify({
          message: "Success",
          code: 200,
        })
      );
      history.push(HOME_PAGE);
    }
  }, [dataSignIn, error, isLoading, history, status, dispatch]);
  return (
    <>
      <HeaderPage
        title="Login"
        paths={[
          {
            link: route.path,
            name: "Sign In",
          },
        ]}
      />
      <LoginForm
        errorLogin={error}
        isLoading={isLoading}
        getUserData={getUserFromInput}
        status={status}
      />
    </>
  );
};

export default SignIn;
