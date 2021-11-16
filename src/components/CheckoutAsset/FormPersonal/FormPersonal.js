import React from "react";
import styles from "../../SignInAsset/LoginForm/Form.module.scss";
import InputUser from "../InputUser/InputUser";
import classes from "./FormPersonal.module.scss";
const FormPersonal = () => {
  return (
    <div className={`${styles.form} ${classes.form}`} autoComplete="off">
      <InputUser
        input={{
          type: "text",
          required: true,
          autoComplete: "off",
          id: "name",
          label: "Name",
          placeholder: "Name...",
        }}
        error='Name is empty!'
        checkCondition={(value) => value.trim().length > 0}
      />
      <InputUser
        input={{
          type: "email",
          required: true,
          autoComplete: "off",
          id: "email",
          label: "Email",
          placeholder: "Email...",
        }}
        error='Email is not valid!'
        checkCondition={(value) =>
          value.trim().length > 0 && value.includes("@")
        }
      />
      <InputUser
        input={{
          type: "text",
          required: true,
          autoComplete: "off",
          id: "phone",
          label: "Mobile Phone",
          placeholder: "Mobile phone...",
        }}
        error='Mobile phone is not valid!'
        checkCondition={(value) => value.trim().length >= 10}
      />
      <div className={classes.note}>
        <textarea rows="4" placeholder="Note..." />
      </div>
    </div>
  );
};

export default FormPersonal;
