import React from "react";
import styles from "../../SignInAsset/LoginForm/Form.module.scss";
import InputUser from "../InputUser/InputUser";
import classes from "./FormPersonal.module.scss";
import { useSelector } from "react-redux";
import { checkInputIsEmpty } from "../../../util";

const FormPersonal = ({ totalRef }) => {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className={`${styles.form} ${classes.form}`} autoComplete="off">
      <InputUser
        ref={totalRef.nameRef}
        input={{
          type: "text",
          required: true,
          autoComplete: "off",
          id: "name",
          label: "Name",
          placeholder: "Name...",
          value: "123",
        }}
        error="Name is empty!"
        checkCondition={value => checkInputIsEmpty(value, 0)}
        initialValue={user?.name || ""}
      />
      <InputUser
        ref={totalRef.emailRef}
        input={{
          type: "email",
          required: true,
          autoComplete: "off",
          id: "email",
          label: "Email",
          placeholder: "Email...",
        }}
        error="Email is not valid!"
        checkCondition={(value) =>
          checkInputIsEmpty(value, 0) && value.trim().includes('@')
        }
        initialValue={user?.email || ""}
      />
      <InputUser
        ref={totalRef.phoneRef}
        input={{
          type: "text",
          required: true,
          autoComplete: "off",
          id: "phone",
          label: "Mobile Phone",
          placeholder: "Mobile phone...",
        }}
        error="Mobile phone is not valid!"
        checkCondition={(value) => checkInputIsEmpty(value, 10)}
        initialValue={user?.phone || ""}
      />
      <InputUser
        ref={totalRef.addressRef}
        input={{
          type: "text",
          required: true,
          autoComplete: "off",
          id: "address",
          label: "Address",
          placeholder: "Address...",
        }}
        error="Address is not allowed to be emptied"
        checkCondition={(value) => checkInputIsEmpty(value, 0)}
      />
      <div className={classes.note}>
        <textarea ref={totalRef.noteRef} rows="4" placeholder="Note..." />
      </div>
    </div>
  );
};

export default FormPersonal;
