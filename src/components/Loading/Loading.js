import React from "react";
import styles from "./Loading.module.scss";
const Loading = (props) => {
  return (
    <div className={props.className}>
      <div className={`${styles["lds-facebook"]}`}>
        <div />
        <div />
        <div />
        {props.children}
      </div>
    </div>
  );
};

export default Loading;
