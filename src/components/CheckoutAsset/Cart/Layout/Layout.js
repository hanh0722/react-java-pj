import React from "react";
import styles from "./Layout.module.scss";
const Layout = (props) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles.container} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default React.memo(Layout);
