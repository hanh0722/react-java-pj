import React, { useMemo, useState } from "react";
import { Redirect } from "react-router-dom";
import Input from "../SignInAsset/Input/Input";
import styles from "../SignInAsset/LoginForm/Form.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import checkValidPassword from "../SignInAsset/CheckValidPassword/CheckValidPassword";
import { Button } from "@material-ui/core";
import { NOT_FOUND, SUCCESS_CHANGE_PASSWORD } from "../link/link";
import classes from "./ResetPassword.module.scss";
import { resetPasswordUser } from "../../config/authorization/authorization";
import useAxios from "../../hook/use-axios";
const ResetPasswordUser = ({ token, _id }) => {
  const {
    isLoading,
    fetchDataFromServer: getDataFromServerHandler,
    status,
    resetAllHandler,
    error,
    data
  } = useAxios();
  const [password, setPassword] = useState("");
  const resetPasswordHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    resetAllHandler();
    getDataFromServerHandler({
      url: resetPasswordUser,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      data: {
        id: _id,
        token: token,
        password: password
      }
    });
  };
  const passwordIsValid = useMemo(() => {
    if (!checkValidPassword(password)) {
      return false;
    }
    return true;
  }, [password]);
  return (
    <>
      {!isLoading && data && !error && (
        <Redirect to={SUCCESS_CHANGE_PASSWORD} />
      )}
      {!isLoading && error && status !== 404 && <Redirect to={NOT_FOUND}/>}
      <div
        className={`${classes.container} d-flex justify-content-center align-items-center`}
      >
        <form
          onSubmit={resetPasswordHandler}
          className={`${styles.form} ${classes.form}`}
        >
          <Input
            functionCondition={(value) => checkValidPassword(value)}
            input={{
              type: "password",
              id: "password",
              autoComplete: "off",
              placeholder: "Type your new password...",
              onChange: (event) => {
                setPassword(event.target.value);
              },
            }}
            label="New Password"
            error="Password needs at least 8 character, one special character, one uppercase and one number"
          >
            <FontAwesomeIcon icon={faLock} />
          </Input>
          <div className={`${styles.button} text-center`}>
            <Button
              className={!passwordIsValid ? styles.disabled : ""}
              disabled={!passwordIsValid || isLoading}
              type="submit"
              variant="contained"
            >
              {!isLoading && "Change password"}
              {isLoading && "Confirming"}
            </Button>
            {!isLoading && error && (
              <p className="error__text">
                {status === 404 && "User is not existed"}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordUser;
