import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./TableProduct.module.scss";
import RowLine from "./RowLine";
import useAxios from "../../../../hook/use-axios";
import {
  getAllProductFromServer,
} from "../../../../config/product/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import { NOT_FOUND } from "../../../link/link";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";

const TableProduct = () => {
  const { isLoading, data, error, fetchDataFromServer } = useAxios();
  const [total, setTotal] = useState(null);
  const [product, setProducts] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const location = useLocation();
  const history = useHistory();
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
    if(total){
      return;
    }
    if (!isLoading && data) {
      const { total_documents } = data?.data;
      setTotal(total_documents);
      setTotalPage(Math.ceil(total_documents / 10));
    }
  }, [isLoading, data, total]);
  useEffect(() => {
    if(!isLoading && data){
      setProducts(data?.data?.products);
    }
  }, [isLoading, data]);

  const removeProductHandler = useCallback((id) => {
    setProducts((prevState) => {
      return prevState.filter((item) => {
        return item._id !== id;
      });
    });
    setTotal((prevState) => prevState - 1);
  }, []);
  const setPrevPage = () => {
    if (query === 1) {
      return;
    }
    history.push(`?page=${query - 1}`);
  };
  const setNextPage = () => {
    if (query === total) {
      return;
    }
    history.push(`?page=${query + 1}`);
  };
  const _renderSkeleton = (number) => {
    const getSkeletons = Array.from(Array(number).keys()).map((_, index) => {
      return <tr key={index}>
        {Array.from(Array(4).keys()).map((_, index) => {
          return <td key={index}><Skeleton times={2}/></td>
        })}
      </tr>
    })
    return getSkeletons;
  }
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <div className={styles["container-table"]}>
        <div className={styles.container}>
          <table className={`w-100 ${styles.table}`}>
            <tbody>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Price</th>
                <th></th>
              </tr>
              {isLoading && _renderSkeleton(8)}
              {!isLoading &&
                data &&
                product &&
                product?.map((item) => {
                  return (
                    <RowLine
                      key={item?._id}
                      name={item?.title}
                      price={item?.last_price}
                      inStock={item?.in_stock}
                      src={item?.image_urls[0]}
                      id={item?._id}
                      removeProductHandler={removeProductHandler}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div
          className={`${styles.pagination} d-flex justify-content-end align-items-center`}
        >
          <div
            onClick={setPrevPage}
            className={`${
              styles.btn
            } d-flex justify-content-center align-items-center ${styles.prev} ${
              query === 1 && styles.disabled
            }`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          {totalPage && (
            <span>
              {query} / {totalPage ? totalPage : ""}
            </span>
          )}
          <div
            onClick={setNextPage}
            className={`${
              styles.btn
            } d-flex justify-content-center align-items-center ${styles.next} ${
              query === totalPage && styles.disabled
            }`}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableProduct;
