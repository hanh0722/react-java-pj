import React, { useEffect } from "react";
import useAxios from "../../../../hook/use-axios";
import { getAllTypesOfProducts } from "../../../../config/product";
import Skeleton from "../../../UI/LoadingSkeleton/Skeleton";
const FetchTypeProduct = ({ onClick, firstList, setFirstList, setList }) => {
  const { isLoading, data, fetchDataFromServer, error } = useAxios();
  useEffect(() => {
    if (firstList) {
      return;
    }
    fetchDataFromServer({
      url: getAllTypesOfProducts,
    });
  }, [fetchDataFromServer, firstList]);
  useEffect(() => {
    if (!isLoading && data) {
      setFirstList(data.data.types_product);
      setList(data.data.types_product)
    }
  }, [isLoading, data, setFirstList, setList]);
  return (
    <>
      {isLoading && <Skeleton times={5} />}
      {!isLoading &&
        firstList &&
        firstList?.map((item, index) => {
          return (
            <li
              onClick={() => onClick(item) || null}
              style={{ textTransform: "capitalize" }}
              key={index}
            >
              {item.toUpperCase()}
            </li>
          );
        })}
      {!isLoading && !data && error && (
        <p style={{ textAlign: "center" }}>
          Cannot get type of products, please try again
        </p>
      )}
      {!isLoading && data && data?.length === 0 && <p className="text-center">We don't have any suggestion! Add one</p>}
    </>
  );
};

export default React.memo(FetchTypeProduct);
