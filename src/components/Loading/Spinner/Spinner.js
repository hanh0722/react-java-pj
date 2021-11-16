import React from "react";
import styles from "./Spinner.module.scss";
const Spinner = (props) => {
  return (
    <div className={`${styles.spinner} d-flex justify-content-center align-items-center`}>
      <div className={`${styles["lds-ring"]} ${props.className}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        {props.children}
      </div>
    </div>
  );
};

export default Spinner;
