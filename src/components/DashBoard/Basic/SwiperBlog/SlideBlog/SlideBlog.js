import React from "react";
import styles from "./SlideBlog.module.scss";
const SlideBlog = ({ src }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.image}>
        <img src={src} alt="" />
      </div>
      <div className={styles.text}>
        <p>Indoor</p>
        <h5>Lorem ipsum dolor sit amet.</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus commodi cupiditate voluptate modi, nobis fugit placeat dolorem tempore at quae?</p>
      </div>
    </div>
  );
};

export default SlideBlog;
