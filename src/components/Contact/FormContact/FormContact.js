import React from "react";
import Input from "../../SignInAsset/Input/Input";
import styles from "../../SignInAsset/LoginForm/Form.module.scss";
import classes from "./FormContact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { TextField, Button } from "@material-ui/core";

const FormContact = () => {
  return (
    <form autoComplete="off" className={`w-100 ${styles.form} ${classes.form}`}>
      <Input
        functionCondition={(name) => name.trim().length > 0}
        input={{
          placeholder: "Name...",
          id: "name",
          type: "text",
          required: true,
          autoComplete: "off",
        }}
        label="Name"
        error="Name is not allowed to be emptied"
      >
        <FontAwesomeIcon icon={faSignature} />
      </Input>
      <Input
        functionCondition={(email) =>
          email.trim().length > 0 && email.includes("@")
        }
        label="Email"
        input={{
          placeholder: "Your Email...",
          id: "email",
          type: "email",
          required: true,
          autoComplete: "off",
        }}
        error="Email is not valid"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </Input>
      <div className={styles.input}>
        <label htmlFor="message">Message</label>
        <TextField
          multiline
          label="Message for us..."
          id="message"
          fullWidth
          variant="outlined"
          autoComplete="off"
        />
      </div>
      <Button className={`w-100 mt-3 ${classes.button}`} variant='contained' type='submit'>Contact</Button>
    </form>
  );
};

export default FormContact;
