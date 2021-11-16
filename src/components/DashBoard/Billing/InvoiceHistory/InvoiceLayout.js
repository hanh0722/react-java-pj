import React from "react";
import { Link } from "react-router-dom";
import styles from './InvoiceLayout.module.scss';
const InvoiceLayout = () => {
  return (
    <div className={`d-flex justify-content-between align-items-center ${styles.container}`}>
      <p>{new Date().toLocaleDateString("vi-vn")}</p>
      <p>$16.61</p>
      <Link to="/">PDF</Link>
    </div>
  );
};

export default InvoiceLayout;
