import React from "react";
import { Link } from "react-router-dom";
import styles from "./SingleBlog.module.scss";
import { Button } from "@material-ui/core";
const SingleBlog = ({ imageUrl, type, title, description, url, preview, className }) => {
  return (
    <div className={`${styles["block--blog"]} ${className}`}>
      <div className={styles["image--container"]}>
        <div className={styles.image}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
      <div className={styles["block--content"]}>
        <p className={styles.type}>{type}</p>
        {!preview && (
          <Link className={styles.link} to={url || "test"}>
            {title}
          </Link>
        )}
        <p className={styles.intro}>{description}</p>
        {!preview && <Link to={url || "test"}>
          <Button variant="outlined" className={`${styles.btn}`}>
            Read More
          </Button>
        </Link>}
      </div>
    </div>
  );
};

export default SingleBlog;
