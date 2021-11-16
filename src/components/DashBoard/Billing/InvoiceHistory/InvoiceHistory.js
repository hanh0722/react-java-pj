import React from "react";
import styles from './InvoiceHistory.module.scss';
import InvoiceLayout from "./InvoiceLayout";
const InvoiceHistory = () => {
    return(
        <div className={styles.container}>
            <h5>Invoice History</h5>
            <InvoiceLayout/>
            <InvoiceLayout/>
            <InvoiceLayout/>
            <InvoiceLayout/>
            <InvoiceLayout/>
            <InvoiceLayout/>
        </div>
    )
}

export default InvoiceHistory;