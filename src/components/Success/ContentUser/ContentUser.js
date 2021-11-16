import React from "react";
import styles from "./ContentUser.module.scss";
const ContentUser = ({email}) => {
  return (
    <div className={styles.container}>
      <p>
        We sent an email to <span>{email}</span> with an{" "}
        <span>instruction</span>
      </p>
      <p>
        Please check the link after email and follow instruction
      </p>
      <p className={styles.note}>Note: If you don't find the email, click all mail or spam/promotion to get instruction</p>
    </div>
  );
};

export default ContentUser;
