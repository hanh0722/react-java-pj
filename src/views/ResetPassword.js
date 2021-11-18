import React, { useEffect, useMemo } from "react";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import { useLocation, Redirect } from "react-router-dom";
import ResetPasswordUser from "../components/ResetPasswordUser/ResetPasswordUser";
import { NOT_FOUND } from "../components/link/link";
import LoadingTime from "../components/ResetPasswordUser/LoadingTime/LoadingTime";
import useAxios from "../hook/use-axios";
import { checkUserIsValidateToken } from "../config/authorization/authorization";
const ResetPassword = (props) => {
  const {fetchDataFromServer: getDataFromServerHandler, error, data, isLoading} = useAxios();
  const location = useLocation();
  const tokens = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      uidToken: searchParams.get("uidt"),
      token: searchParams.get("token"),
    };
  }, [location.search]);
  useEffect(() => {
    const { uidToken, token } = tokens;
    if (!uidToken || !token) {
      return;
    }
    getDataFromServerHandler({
      url: checkUserIsValidateToken,
      params: {
        id: uidToken,
        token: token
      }
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
      {isLoading && <LoadingTime />}
      {!isLoading && data && !error && (
        <ResetPasswordUser token={tokens.token} _id={data?.data?._id} />
      )}
      {/* {!isLoading && !data && error && <Redirect to={NOT_FOUND}/>} */}
    </>
  );
};

export default ResetPassword;
