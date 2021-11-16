import React, { useEffect } from "react";
import Header from "../components/SignInAsset/RegisterForm/Header/Header";
import RegisterForm from "../components/SignInAsset/RegisterForm/RegisterForm";
import useFetch from "../hook/use-fetch";
import { useHistory } from "react-router-dom";
import { registerUrl } from "../config/url";
import Overlay from "../components/overlay/Overlay";
import ReactDOM from "react-dom";
import FixLayout from "../components/FixLayout/FixLayout";
import { CSSTransition } from "react-transition-group";
import "../components/styles/animation-transition.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../components/SignInAsset/RegisterForm/Register.module.scss";
import { PAGE_VERIFY_FIRST } from "../components/link/link";
const Register = () => {
  const history = useHistory();
  const {
    isLoading,
    data,
    error,
    status,
    resetAllHandler,
    getDataFromServerHandler: sendDataToServer,
  } = useFetch();
  const registerHandler = (userData) => {
    sendDataToServer({
      url: registerUrl,
      options: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      },
      message: "User is already existed!",
    });
  };
  useEffect(() => {
    if (data && !isLoading && !error) {
      history.push(`${PAGE_VERIFY_FIRST}?id=${data._id}`);
      console.log(data);
      // change to send information
    }
  }, [data, error, history, isLoading]);
  return (
    <>
      <Header />
      <RegisterForm isLoading={isLoading} onRegister={registerHandler} />
      <CSSTransition
        in={!isLoading && error && status <= 500 && status >= 400}
        unmountOnExit
        mountOnEnter
        timeout={500}
        classNames="first--modal"
      >
        <>
          <FixLayout className={`text-center ${styles.container}`}>
            {status === 422 && (
              <p>User is already existed, please choose other email!</p>
            )}
            {status === 500 && <p>Something went wrong, please try again</p>}
            <div onClick={resetAllHandler} className={`${styles.close} d-flex justify-content-center align-items-center`}>
              <FontAwesomeIcon icon={faTimes}/>
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
