import React from "react";
import p1 from "../../../../../image/default-user.jpg";
import styles from "./ImageUser.module.scss";
const ImageUser = ({ src, isLoading, percentUpload }) => {
  return (
    <div className={`${styles.container} w-100 h-100`}>
      {isLoading && (
        <>
          <span style={{clip: `clip: rect(0px, 144px, 144px, calc(144 / ${percentUpload})px)`}} className={styles.loading}>
            <span className={styles.progress} />
          </span>
          <span className={styles.percent}>{percentUpload}%</span>
        </>
      )}
      <img draggable={true} src={src || p1} alt="user" />
    </div>
  );
};

export default ImageUser;
