import React, { useMemo, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import Verify from "../components/Verify/Verify";
import useAxios from "../hook/use-axios";
import { PAGE_SUCCESS_REGISTER } from "../components/link/link";
import { checkOTPOfUser } from "../config/authorization/authorization";

const VerifyAccount = () => {
  const [errorOTP, setErrorOTP] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const id = params.get("id");
  const { fetchDataFromServer, data, error, isLoading, resetAllHandler } =
    useAxios();
  const verifyHandler = (data) => {
    if (!token && !id) {
      return;
    }
    setErrorOTP(false);
    if (data.length < 4) {
      setErrorOTP(true);
    }
    const setOTP = +data;
    resetAllHandler();
    fetchDataFromServer({
      url: checkOTPOfUser,
      method: "POST",
      data: {
        id: id,
        OTP: setOTP,
      },
    });
  };
  const accountIsVerified = useMemo(() => {
    if (!isLoading && data && data.data.verified && !error) {
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
