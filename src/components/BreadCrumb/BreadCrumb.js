import React from "react";
import styles from "./BreadCrumb.module.scss";
const BreadCrumb = (props) => {
  return (
    <div className={`${styles.breadcrumb} bread-crumb ${props.className}`}>
        {props.children}
    </div>
  );
};

export default React.memo(BreadCrumb);
