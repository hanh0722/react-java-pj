import React from "react";
import styles from "./Circle.module.scss";
const Circle = (props) => {
  return (
    <div className={`${styles.circle} d-flex justify-content-center align-items-center ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Circle;
