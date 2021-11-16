import React, { useEffect, useMemo } from "react";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import { useLocation, Redirect } from "react-router-dom";
import ResetPasswordUser from "../components/ResetPasswordUser/ResetPasswordUser";
import { checkResetPasswordUrl } from "../config/url";
import { NOT_FOUND } from "../components/link/link";
import useFetch from "../hook/use-fetch";
import LoadingTime from "../components/ResetPasswordUser/LoadingTime/LoadingTime";
const ResetPassword = (props) => {
  const { getDataFromServerHandler, error, data, isLoading } =
    useFetch();
  const location = useLocation();
  const tokens = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      uidToken: searchParams.get('uidt'),
      token: searchParams.get('token')
    }
  }, [location.search]);
  useEffect(() => {
    const {uidToken, token} = tokens;
    if (!uidToken || !token) {
      return;
    }
    getDataFromServerHandler({
      url: checkResetPasswordUrl(token, uidToken),
    });
  }, [tokens, getDataFromServerHandler]);
  return (
    <>
      {(!tokens.token || !tokens.uidToken) && <Redirect to={NOT_FOUND} />}
      <HeaderPage
        title="Reset Password"
        paths={[
          {
            name: "Reset Password",
            link: `${location.pathname}${location.search}`,
          },
        ]}
      />
      {isLoading && <LoadingTime/>}
      {!isLoading && data && !error && <ResetPasswordUser token={tokens.token} _id={data.userId}/>}
      {!isLoading && !data && error && <Redirect to={NOT_FOUND}/>}
    </>
  );
};

export default ResetPassword;
