import React from "react";
import styles from "./SmallSpinner.module.scss";
const SmallSpinner = (props) => {
  return (
    <div className={`${styles['loader-3']} ${styles.center}`}>
      <span></span>
    </div>
  );
};

export default SmallSpinner;
