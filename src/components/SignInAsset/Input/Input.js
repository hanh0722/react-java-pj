import React, { forwardRef, useEffect } from "react";
import NormalInput from "../../input/NormalInput/NorInput";
import styles from "../LoginForm/Form.module.scss";
import useInput from "../../../hook/use-input";
import Thumb from "../../Thumb/Thumb";
import { CSSTransition } from "react-transition-group";
const Input = forwardRef(
  (
    {
      functionCondition,
      input,
      className,
      label,
      thumbcontent,
      children,
      error,
      initialValue,
    },
    ref
  ) => {
    const {
      changeInputHandler,
      value,
      valid,
      isTouched,
      touchedInputHandler,
      isFocused,
      focusInputHandler,
      setInitialValue
    } = useInput((value) => functionCondition(value));
    const changeInputHandlerFn = (event) => {
      changeInputHandler(event);
      if (input.onChange) {
        input.onChange(event);
      }
    };
    useEffect(() => {
      if(!initialValue){
        return;
      }
      setInitialValue(initialValue)
    }, [initialValue, setInitialValue]);
    return (
      <>
        <div className={`${styles.input} ${className}`}>
          <label htmlFor={input.id}>{label}</label>
          <div className={`${styles.box}`}>
            {thumbcontent && (
              <Thumb
                className={`${styles.thumb} ${
                  isFocused &&
                  value.trim().length === 0 &&
                  styles["thumb--back"]
                }`}
              >
                {input.thumbcontent}
              </Thumb>
            )}
            {children}
            <NormalInput
              ref={ref}
              input={{
                ...input,
                value: value,
                onChange: changeInputHandlerFn,
                onBlur: touchedInputHandler,
                onFocus: focusInputHandler,
              }}
              className={!valid && isTouched ? "error__input" : ""}
            />
          </div>
          <CSSTransition
            in={!valid && isTouched}
            mountOnEnter
            unmountOnExit
            classNames="scale"
            timeout={500}
          >
            <p className="error__text pt-3" style={{ fontSize: "12px" }}>
              {error}
            </p>
          </CSSTransition>
        </div>
      </>
    );
  }
);

export default React.memo(Input);
