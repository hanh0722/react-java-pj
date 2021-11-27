import React, { useEffect, useMemo, useState } from "react";
import styles from "./TableProduct.module.scss";
import RowLine from "./RowLine";
import useAxios from "../../../../hook/use-axios";
import { getAllProductFromServer } from "../../../../config/product/product";
import { useLocation, Redirect } from "react-router-dom";
import { NOT_FOUND } from "../../../link/link";
const TableProduct = () => {
  const { isLoading, data, error, fetchDataFromServer } = useAxios();
  const [total, setTotal] = useState(null);
  const location = useLocation();
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    return +page || 1;
  }, [location.search]);
  useEffect(() => {
    fetchDataFromServer({
      url: getAllProductFromServer,
      params: {
        page: query,
        per_page: 10,
      },
    });
  }, [fetchDataFromServer, query]);
  useEffect(() => {
    if (total) {
      return;
    }
    if (!isLoading && data) {
      const { total_documents } = data?.data;
      setTotal(total_documents);
    }
  }, [isLoading, data, total]);
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <div className={styles['container-table']}>
        <div className={styles.container}>
          <table className={`w-100 ${styles.table}`}>
            <tbody>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Price</th>
                <th></th>
              </tr>
              {!isLoading &&
                data &&
                data?.data?.products?.map((item) => {
                  return (
                    <RowLine
                      key={item?._id}
                      name={item?.title}
                      price={item?.last_price}
                      inStock={item?.in_stock}
                      src={item?.image_urls[0]}
                      id={item?._id}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableProduct;
