import React from "react";
import styles from "./Banner.module.scss";
const BannerImages = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <div className={styles.banner}>{props.children}</div>
    </div>
  );
};

export default BannerImages;
