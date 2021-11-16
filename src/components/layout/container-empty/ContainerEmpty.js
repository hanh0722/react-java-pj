import React from "react";
import styles from "./ContainerEmpty.module.scss";
const ContainerEmpty = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default ContainerEmpty;
