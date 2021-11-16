import React, { useMemo, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import Verify from "../components/Verify/Verify";
import useFetch from "../hook/use-fetch";
import { urlCheckVerify } from "../config/url";
import { PAGE_SUCCESS_REGISTER } from "../components/link/link";
const VerifyAccount = () => {
  const [errorOTP, setErrorOTP] = useState(false);
  const { getDataFromServerHandler, data, error, isLoading, resetAllHandler } =
    useFetch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const id = params.get("id");
  const verifyHandler = (data) => {
    if (!token && !id) {
      return;
    }
    resetAllHandler();
    setErrorOTP(false);
    if (data.length < 4) {
      setErrorOTP(true);
    }
    const setOTP = +data;
    getDataFromServerHandler({
      url: urlCheckVerify(id, token),
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          OTP: setOTP,
        }),
      },
    });
  };
  console.log(data, error, isLoading);
  const accountIsVerified = useMemo(() => {
    if (!isLoading && data && data.verify.verified && !error) {
      return true;
    }
    return false;
  }, [data, isLoading, error]);
  return (
    <>
      <HeaderPage
        paths={[
          {
            link: location.pathname,
            name: "Verify Account",
          },
        ]}
        title="Verify Account"
      />
      <Verify
        checkErrorOTP={errorOTP}
        verifyOTP={verifyHandler}
        errorOTP={error}
        dataVerify={data}
        loadingOTP={isLoading}
      />
      {accountIsVerified && <Redirect to={PAGE_SUCCESS_REGISTER} />}
    </>
  );
};

export default VerifyAccount;
