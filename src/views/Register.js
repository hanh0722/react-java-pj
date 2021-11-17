import React, { useEffect } from "react";
import Header from "../components/SignInAsset/RegisterForm/Header/Header";
import RegisterForm from "../components/SignInAsset/RegisterForm/RegisterForm";
import { Redirect } from "react-router-dom";
import { registerApi, sendMailAfterRegister } from "../config/authorization/authorization";
import Overlay from "../components/overlay/Overlay";
import ReactDOM from "react-dom";
import FixLayout from "../components/FixLayout/FixLayout";
import { CSSTransition } from "react-transition-group";
import "../components/styles/animation-transition.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../components/SignInAsset/RegisterForm/Register.module.scss";
import { PAGE_VERIFY_FIRST } from "../components/link/link";
import useAxios from "../hook/use-axios";
const Register = () => {
  const {
    isLoading,
    error,
    data,
    fetchDataFromServer,
    status,
    resetAllHandler,
  } = useAxios();
  const {
    isLoading: isLoadingCheck,
    error: errorCheck,
    data: dataCheck,
    fetchDataFromServer: fetchingData,
    status: statusCheck,
  } = useAxios();
  const registerHandler = (userData) => {
    const { name, email, password, phone } = userData;
    fetchDataFromServer({
      url: registerApi,
      method: "POST",
      data: {
        name: name,
        email: email,
        password: password,
        phone: phone,
      },
    });
  };
  useEffect(() => {
    if(!isLoading && data){
      fetchingData({
        method: 'POST',
        url: sendMailAfterRegister,
        data: {
          email: data?.data?.email
        }
      })
    }
  }, [data, isLoading, fetchingData]);
  return (
    <>
      {!isLoadingCheck && !isLoading && dataCheck && data && <Redirect to={`${PAGE_VERIFY_FIRST}?id=${data?.data?._id}`}/>}
      <Header />
      <RegisterForm isLoading={isLoading} onRegister={registerHandler} />
      <CSSTransition
        in={(!isLoading && error && status <= 500 && status >= 400) || (!isLoadingCheck && error)}
        unmountOnExit
        mountOnEnter
        timeout={500}
        classNames="first--modal"
      >
        <>
          <FixLayout className={`text-center ${styles.container}`}>
            {((error && status !== 200) || (errorCheck && statusCheck !== 200)) && (
              <p>{error.message || errorCheck.message || "Cannot get data from server"}</p>
            )}
            <div
              onClick={resetAllHandler}
              className={`${styles.close} d-flex justify-content-center align-items-center`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </FixLayout>
          {ReactDOM.createPortal(
            <Overlay onClick={resetAllHandler} />,
            document.getElementById("bg__ol")
          )}
        </>
      </CSSTransition>
    </>
  );
};

export default Register;
