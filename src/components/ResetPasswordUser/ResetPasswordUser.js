import React, { useMemo, useState } from "react";
import { Redirect } from "react-router-dom";
import Input from "../SignInAsset/Input/Input";
import styles from "../SignInAsset/LoginForm/Form.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import checkValidPassword from "../SignInAsset/CheckValidPassword/CheckValidPassword";
import useFetch from "../../hook/use-fetch";
import { Button } from "@material-ui/core";
import { changePasswordFromUser } from "../../config/url";
import { SUCCESS_CHANGE_PASSWORD } from "../link/link";
const ResetPasswordUser = ({ token, _id }) => {
  const [password, setPassword] = useState("");
  const {
    getDataFromServerHandler,
    isLoading,
    status,
    resetAllHandler,
    data,
    error,
  } = useFetch();
  const resetPasswordHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    resetAllHandler();
    getDataFromServerHandler({
      url: changePasswordFromUser,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          token: token,
          _id: _id,
        }),
      },
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
      {!isLoading && data && !error && <Redirect to={SUCCESS_CHANGE_PASSWORD} />}
      <form onSubmit={resetPasswordHandler} className={styles.form}>
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
              {status === 408 && "The url is expired, please try again"}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default ResetPasswordUser;
