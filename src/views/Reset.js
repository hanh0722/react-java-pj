import React from "react";
import { SIGN_IN_PAGE, REGISTER_PAGE } from "../components/link/link";
import { useRouteMatch, Redirect } from "react-router-dom";
import ForgetPassword from "../components/SignInAsset/ForgetPassword/ForgetPassword";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import useFetch from "../hook/use-fetch";
import { PAGE_VERIFY_FIRST } from "../components/link/link";
import { resetPasswordByEmail } from "../config/authorization/authorization";
const Reset = () => {
  const route = useRouteMatch();
  const { isLoading, error, data, getDataFromServerHandler, resetAllHandler } =
    useFetch();
  const resetPasswordHandler = (emailUser) => {
    if (!emailUser) {
      return;
    }
    resetAllHandler();
    getDataFromServerHandler({
      url: resetPasswordByEmail,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailUser,
        }),
      },
    });
  };
  return (
    <>
      {!isLoading && !error && data && (
        <Redirect to={`${PAGE_VERIFY_FIRST}?id=${data._id}`} />
      )}
      <HeaderPage
        title="Reset Password"
        paths={[
          {
            link: SIGN_IN_PAGE,
            name: "Sign in",
          },
          {
            link: REGISTER_PAGE,
            name: "Register",
          },
          {
            link: route.path,
            name: "Reset password",
          },
        ]}
      />
      <ForgetPassword
        isLoadingFromServer={isLoading}
        resetPasswordHandler={resetPasswordHandler}
        errorChecking={error}
        resetAllHandler={resetAllHandler}
      />
    </>
  );
};

export default Reset;
