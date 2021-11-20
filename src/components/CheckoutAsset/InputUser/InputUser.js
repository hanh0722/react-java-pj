import React, { forwardRef } from "react";
import NormalInput from "../../input/NormalInput/NorInput";
import useInput from "../../../hook/use-input";
import styles from "./InputUser.module.scss";
import { CSSTransition } from "react-transition-group";

const InputUser = forwardRef((props, ref) => {
  const { valid, touchedInputHandler, changeInputHandler, isTouched, value } =
    useInput((value) => props.checkCondition(value));
  const onChangeHandler = (event) => {
    changeInputHandler(event);
    if(props.changeInput){
      props.changeInput(event);
    }
  };
  return (
    <>
      <div className={styles.input}>
        <label htmlFor={props.input.id}>{props.input.label}</label>
        <NormalInput
          ref={ref}
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
});

export default React.memo(InputUser);
