import React from "react";
import styles from "./Button.module.scss";
const ButtonItem = (props) => {
  return (
    <div onClick={props.onClick} className={`${styles.btn} ${props.className}`}>
      <span>
        <div></div>
        <div></div>
      </span>
    </div>
  );
};

export default ButtonItem;
