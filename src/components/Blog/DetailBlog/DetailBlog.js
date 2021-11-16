import React from "react";
import styles from "./DetailBlog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import StringToHTML from "../../helper/StringToHTML";
const DetailBlog = ({category, user, timeCreated, contentBlog, title}) => {
  return (
    <>
      <article className={styles.container}>
        <header className={`text-center ${styles.header}`}>
          <h6>Category: {category && (category || category[0])}</h6>
          <h4>{title}</h4>
          <p>
            Created by <span>{user ? user : "ADMIN"}</span> on <span>{timeCreated}</span>
          </p>
        </header>
        <StringToHTML className={styles.content} stringHTML={contentBlog}/>
      </article>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.options}`}
      >
        <div className={styles.tags}>
          Tags:
          <span>Accessories,</span>
          <span>Life Style</span>
        </div>
        <div className={`d-flex align-items-center ${styles.share}`}>
          Share:{" "}
          <span>
            <FontAwesomeIcon icon={faFacebookF} />
          </span>
          <span>
            <FontAwesomeIcon icon={faTwitter} />
          </span>
        </div>
      </div>
    </>
  );
};
export default DetailBlog;
