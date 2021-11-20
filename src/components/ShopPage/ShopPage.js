import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouteMatch, Redirect, useLocation } from "react-router-dom";
import Product from "../Product/Product";
import nonAccentVietnamese from "../removeUnicode/removeUnicode";
import useAxios from "../../hook/use-axios";
import { NOT_FOUND } from "../link/link";
import Grid from "../UI/Grid/Grid";
import Pagination from "../Pagination/Pagination";
import ChooseItemPerpage from "../ChooseItemPerpage/ChooseItemPerpage";
import { getAllProductFromServer } from "../../config/product/product";
const ShopPage = () => {
  const { isLoading, fetchDataFromServer, error, data } = useAxios();
  const [perPage, setPage] = useState(8);
  const [totalPage, setTotalPage] = useState(null);
  const location = useLocation();
  const getCurrentPage = useMemo(() => {
    const url = new URLSearchParams(location.search);
    const page = +url.get("page") || 1;
    return page;
  }, [location.search]);
  const route = useRouteMatch();
  useEffect(() => {
    fetchDataFromServer({
      url: getAllProductFromServer,
      params: {
        page: getCurrentPage,
        per_page: perPage,
      },
    });
  }, [fetchDataFromServer, getCurrentPage, perPage]);
  const _renderLoadingSkeleton = useCallback((number) => {
    const arrayRender = [];
    for (let i = 0; i < number; i++) {
      arrayRender.push(<Product key={i} isLoading={true} />);
    }
    return arrayRender;
  }, []);
  useEffect(() => {
    if (!totalPage && data) {
      setTotalPage(data.data.total_documents);
    }
  }, [data, totalPage]);
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <ChooseItemPerpage defaultColumn={8} setColumnPerPage={setPage} />
      <Grid>
        {isLoading && _renderLoadingSkeleton(perPage)}
        {!isLoading && data && (
          <>
            {data.data.products.map((product) => {
              const path = nonAccentVietnamese(product.title);
              return (
                <Product
                  key={product._id}
                  imageUrl={
                    product.image_urls[0]
                      ? product.image_urls[0]
                      : "/logo512.png"
                  }
                  price={product.last_price}
                  name={product.title}
                  id={product._id}
                  link={`${route.path}/${path}?id=${product._id}`}
                />
              );
            })}
          </>
        )}
      </Grid>
      {!isLoading && data && totalPage && totalPage !== 0 && (
        <Pagination
          perPage={perPage}
          totalPage={totalPage}
          currentPage={getCurrentPage}
        />
      )}
    </>
  );
};

export default ShopPage;
