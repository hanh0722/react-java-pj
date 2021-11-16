import React from "react";
import styles from "./SmallButton.module.scss";
const SmallButton = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${styles.btn} d-flex justify-content-center align-items-center ${props.className}`}
    >
      <span className={styles.ripple}></span>
      {props.children}
    </div>
  );
};

export default SmallButton;
