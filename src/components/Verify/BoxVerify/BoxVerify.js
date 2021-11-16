import React, { useState, forwardRef } from "react";
import styles from "./BoxVerify.module.scss";
import Input from "../../input/NormalInput/NorInput";
const BoxVerify = forwardRef((props, ref) => {
  const [inputVerify, setInputVerify] = useState("");
  const changeInputHandler = (event) => {
    if (inputVerify.length === 1) {
      return;
    }
    setInputVerify(event.target.value);
  };
  const getInputHandler = (event) => {
    if (event.keyCode === 8) {
      setInputVerify("");
    }
  };
  return (
    <div className={`${styles.verify} ${props.className} ${inputVerify.length === 1 && styles.filled}`}>
      <Input
        input={{
          type: "number",
          required: true,
          max: "9",
          min: "0",
          autoComplete: "off",
          onChange: changeInputHandler,
          onKeyDown: getInputHandler,
          value: inputVerify,
          ref: ref,
        }}
      />
    </div>
  );
});

export default BoxVerify;
