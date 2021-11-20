import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import LoginForm from "../components/SignInAsset/LoginForm/LoginForm";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import checkValidPassword from "../components/SignInAsset/CheckValidPassword/CheckValidPassword";
import { HOME_PAGE } from "../components/link/link";
import { useDispatch } from "react-redux";
import { NotifyActions } from "../components/store/NotifyAfterLogin/NotifyAfterLogin";
import { isAuthActions } from "../components/store/IsAuth/is-auth";
import { loginApi } from "../config/authorization/authorization";
import useAxios from "../hook/use-axios";
const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const route = useRouteMatch();
  const {
    fetchDataFromServer: getDataFromServerHandler,
    isLoading,
    error,
    resetAllHandler,
    status,
    data,
  } = useAxios();
  const getUserFromInput = (userData) => {
    if (
      !userData.email.includes("@") ||
      !checkValidPassword(userData.password)
    ) {
      return;
    }
    resetAllHandler();
    const params = new URLSearchParams();
    params.append("email", userData.email);
    params.append("password", userData.password);
    getDataFromServerHandler({
      url: loginApi,
      data: params,
      method: "POST",
    });
  };
  useEffect(() => {
    if (error || isLoading) {
      return;
    }
    if (!isLoading && data && !error) {
      const { token, email } = data.data;
      localStorage.setItem("token/customer", token);
      localStorage.setItem(
        "expiry/customer",
        Date.now() + 3 * 60 * 60 * 1000
      );
      localStorage.setItem('tracking/user', email);
      dispatch(isAuthActions.setIsAuthenticated({
        token: token,
        emailUser: email
      }));
      dispatch(
        NotifyActions.showedNotify({
          message: "Success",
          code: 200,
        })
      );
      history.push(HOME_PAGE);
    }
  }, [isLoading, error, data, dispatch, history]);
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
