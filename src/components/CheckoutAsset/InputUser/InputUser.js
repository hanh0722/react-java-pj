import React from "react";
import NormalInput from "../../input/NormalInput/NorInput";
import useInput from "../../../hook/use-input";
import styles from "./InputUser.module.scss";
import { CSSTransition } from "react-transition-group";

const InputUser = (props) => {
  const { valid, touchedInputHandler, changeInputHandler, isTouched, value } =
    useInput((value) => props.checkCondition(value));
  const onChangeHandler = (event) => {
    changeInputHandler(event);
  };
  return (
    <>
      <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.input.label}</label>
        <NormalInput
          input={{
            ...props.input,
            onChange: onChangeHandler,
            onBlur: touchedInputHandler,
            value: value,
          }}
          className={`${styles.input} w-100 ${
            !valid && isTouched && "error__input"
          }`}
        />
        <CSSTransition
          in={!valid && isTouched}
          timeout={500}
          unmountOnExit
          mountOnEnter
          classNames="scale"
        >
          <p className={`error__text ${styles.error}`}>{props.error}</p>
        </CSSTransition>
      </div>
    </>
  );
};

export default React.memo(InputUser);
