import React from "react";
import styles from "./Ripple.module.scss";
const Ripple = (props) => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${props.className}`}>
      <div className={`${styles["lds-ripple"]}`}>
        <div></div>
        <div></div>
        {props.children}
      </div>
    </div>
  );
};

export default Ripple;
