import React, { useEffect, useRef, useState } from "react";
import styles from "./ChangePasswordUser.module.scss";
import BoxContainer from "../UI/BoxContainer/BoxContainer";
import Input from "../../SignInAsset/Input/Input";
import { checkInputIsEmpty } from "../../../util";
import { isPassword } from "../../helper/validationInput";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../../hook/use-toggle";
import Transition from '../../Transition/Transition';
import useAxios from '../../../hook/use-axios';
import { updatePasswordByToken } from "../../../config/url";
import { useSelector, useDispatch } from "react-redux";
import { NotifyActions } from "../../store/NotifyAfterLogin/NotifyAfterLogin";
const ChangePasswordUser = () => {
  const token = useSelector(state => state.isAuth.token);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const { toggle, changeToggleHandler } = useToggle(false);
  const {isLoading, error, data, fetchDataFromServer, status} = useAxios();
  const oldPasswordRef = useRef();

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChangeHandler = (event) => {
    setConfirmpassword(event.target.value);
  };
  useEffect(() => {
    if (password.trim().length === 0) {
      return setPasswordIsValid(false);
    }
    if (confirmPassword === password) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }, [password, confirmPassword]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    const oldPassword = oldPasswordRef.current.value;
    fetchDataFromServer({
      url: updatePasswordByToken,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword
      }
    })
  };
  useEffect(() => {
    if(isLoading){
      return;
    }
    if(!isLoading && data && !error){
      dispatch(NotifyActions.showedNotify({
        message: "Changed Password Successfully",
        code: status
      }))
    }
    if(!isLoading && !data && error){
      dispatch(NotifyActions.showedNotify({
        message: error.message || "Cannot get data from server",
        code: status
      }))
    }
  }, [isLoading, data, error, dispatch, status]);
  return (
    <BoxContainer>
      <form onSubmit={submitFormHandler} className={styles.form}>
        <Input
          ref={oldPasswordRef}
          functionCondition={(value) => checkInputIsEmpty(value)}
          input={{
            type: toggle ? "text" : "password",
            placeholder: "Old Password",
            required: true,
            id: "old-password",
          }}
          label="Old password"
          error="Old password must be filled"
        />
        <Input
          functionCondition={(value) => isPassword(value)}
          input={{
            type: toggle ? "text" : "password",
            placeholder: "New password",
            required: true,
            id: "new-password",
            onChange: passwordChangeHandler,
          }}
          label="New password"
          error="Password must be at least 8 characters long and contain one special, uppercase character"
        />
        <Input
          functionCondition={(value) => passwordIsValid && isPassword(value)}
          input={{
            type: toggle ? "text" : "password",
            placeholder: "Confirm Password",
            required: true,
            id: "confirm-password",
            onChange: confirmPasswordChangeHandler,
          }}
          label="Confirm password"
          error="The field must be matched with new password"
        />
        <div className={`text-end ${styles.button}`}>
          <Button
            className={!passwordIsValid ? styles.disabled : ""}
            type="submit"
            variant="contained"
            disabled={!passwordIsValid}
          >
            Save Changes
          </Button>
        </div>
        <div className={`d-flex align-items-center ${styles["show-password"]}`}>
          <p>Show Password</p>
          <div onClick={changeToggleHandler} className={styles.checkbox}>
            <Transition options={{
              in: toggle,
              classNames: "fade-effect",
              unmountOnExit: true,
              mountOnEnter: true,
              timeout: 500
            }}>
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </Transition>
          </div>
        </div>
      </form>
    </BoxContainer>
  );
};

export default ChangePasswordUser;
