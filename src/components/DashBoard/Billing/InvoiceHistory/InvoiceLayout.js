import React from "react";
import styles from './InvoiceLayout.module.scss';
const InvoiceLayout = ({url, time}) => {
  return (
    <div className={`d-flex justify-content-between align-items-center ${styles.container}`}>
      <p>{new Date(time).toLocaleDateString("vi-vn")}</p>
      <a href={url} target={"_blank"} rel="noreferrer">PDF</a>
    </div>
  );
};

export default InvoiceLayout;
