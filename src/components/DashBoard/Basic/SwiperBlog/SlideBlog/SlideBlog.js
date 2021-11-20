import React from "react";
import styles from "./SlideBlog.module.scss";
const SlideBlog = ({ src, category, title, short_description }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.image}>
        <img src={src} alt="" />
      </div>
      <div className={styles.text}>
        <p>{category}</p>
        <h5>{title}</h5>
        <p>{short_description}</p>
      </div>
    </div>
  );
};

export default SlideBlog;
