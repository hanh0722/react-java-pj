import React, { useEffect } from "react";
import styles from "./InvoiceHistory.module.scss";
import InvoiceLayout from "./InvoiceLayout";
import useAxios from "../../../../hook/use-axios";
import { getInvoicesByPage } from "../../../../config/cart/cart";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";
const InvoiceHistory = ({ token }) => {
  const { isLoading, error, data, fetchDataFromServer } = useAxios();
  useEffect(() => {
    fetchDataFromServer({
      url: getInvoicesByPage,
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {},
    });
  }, [fetchDataFromServer, token]);
  return (
    <>
      <div className={styles.container}>
          {!isLoading && error && <p className="text-center pt-3">Cannot get data</p>}
        <h5>Invoice History</h5>
        {isLoading && <Skeleton times={10}/>}
        {!isLoading && data && data?.data?.bills?.map(item => {
            return <InvoiceLayout time={item?.date_created} key={item._id} url={item?.invoiceId}/>
        })}
      </div>
    </>
  );
};

export default InvoiceHistory;
