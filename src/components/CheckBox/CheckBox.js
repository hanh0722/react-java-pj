import React from "react";
import styles from "./CheckBox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const CheckBox = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`d-inline-flex justify-content-center align-items-center ${
        props.isCheck && styles["is--checked"]
      } ${styles.checkbox} ${props.className}`}
    >
      {props.isCheck && <FontAwesomeIcon icon={faCheck} />}
    </div>
  );
};

export default CheckBox;
