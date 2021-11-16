import React, { useEffect, useMemo, useState } from "react";
import styles from "../LoginForm/Form.module.scss";
import classes from "./ForgetPassword.module.scss";
import NormalInput from "../../input/NormalInput/NorInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import useInput from "../../../hook/use-input";
import { CSSTransition } from "react-transition-group";
import useFetch from "../../../hook/use-fetch";
import { urlGetUserForgetPassword } from "../../../config/url";
import Container from "../../layout/container-empty/ContainerEmpty";
import { Button } from "@material-ui/core";
import SmallSpinner from "../../Loading/SmallSpinner/SmallSpinner";
const ForgetPassword = ({resetPasswordHandler, isLoadingFromServer}) => {
  const [waitInput, setWaitInput] = useState(false);
  const [inputIsFetched, setInputIsFetched] = useState(false);
  const { getDataFromServerHandler, data, isLoading, error, status, resetAllHandler } =
    useFetch();
  const { value, valid, touchedInputHandler, isTouched, changeInputHandler } =
    useInput(
      (valueEmail) => valueEmail.trim().length > 0 && valueEmail.includes("@")
    );
  const isValidOpening = useMemo(() => {
    if (!isLoading && error) {
      return false;
    }
    if (!valid && isTouched) {
      return false;
    }
    return true;
  }, [isLoading, error, valid, isTouched]);
  useEffect(() => {
    if (!valid && value.trim().length === 0) {
      resetAllHandler();
      setWaitInput(false);
      return;
    }
    const inputIsEntered = setTimeout(() => {
      getDataFromServerHandler({
        url: urlGetUserForgetPassword(value),
      });
      setWaitInput(false);
      setInputIsFetched(true);
    }, 1000);
    return () => {
      clearTimeout(inputIsEntered);
      resetAllHandler();
      setWaitInput(true);
    };
  }, [value, valid, getDataFromServerHandler, resetAllHandler, isTouched]);
  return (
    <Container>
      <div className={styles.form}>
        <div className={`${styles.input}`}>
          <label htmlFor="email">Email</label>
          <div className={classes.input}>
            <FontAwesomeIcon icon={faEnvelope} />
            <NormalInput
              input={{
                type: "email",
                autoComplete: "off",
                value: value,
                onChange: changeInputHandler,
                onBlur: touchedInputHandler,
                placeholder: "Email...",
              }}
              className={`${classes['input--email']} ${!valid && isTouched && "error__input"}`}
            />
            {(waitInput || isLoading) && <SmallSpinner/>}
          </div>
          <CSSTransition
            in={!isValidOpening || (!isLoading && data && !error)}
            unmountOnExit
            mountOnEnter
            timeout={500}
            classNames="scale"
          >
            <p className={`error__text text-center`}>
              {!inputIsFetched && !valid && isTouched && "Please fill out the email!"}
              {!isLoading && error && status === 404 && "Email is not existed"}
              {!isLoading &&
                error &&
                status === 401 &&
                "Email is unactivated, please check the inbox of email"}
              {!isLoading && data && !error && (
                <Button onClick={() => resetPasswordHandler(value)} style={{ padding: "6px 16px" }} className={classes.btn}>
                  Reset password
                </Button>
              )}
            </p>
          </CSSTransition>
        </div>
      </div>
    </Container>
  );
};

export default ForgetPassword;
