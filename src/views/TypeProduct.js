import React, { useEffect, useMemo } from "react";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import {
  useParams,
  useRouteMatch,
  Redirect,
  useLocation,
} from "react-router-dom";
import ProductsPage from "../components/TypeProduct/TypeProduct";
import useAxios from "../hook/use-axios";
import { NOT_FOUND } from "../components/link/link";
import { getProductByType } from "../config/product/product";
const TypeProduct = () => {
  const params = useParams();
  const route = useRouteMatch();
  const { isLoading, error, data, fetchDataFromServer } = useAxios();
  const location = useLocation();

  const pageParam = useMemo(() => {
    const param = new URLSearchParams(location.search);
    const page = param.get("page");
    if (!page) {
      return 1;
    }
    return +param.get("page");
  }, [location.search]);

  useEffect(() => {
    fetchDataFromServer({
      url: getProductByType(params.type),
      params: {
        page: pageParam,
        per_page: 8,
      },
    });
  }, [params.type, fetchDataFromServer, pageParam]);
  // useEffect(() => {
  //   if(isLoading || error || !data){
  //     return;
  //   }
  //   if(totalPage){
  //     return;
  //   }
  //   setTotalPage(data.data?.total_documents);
  // }, [isLoading, error, data, totalPage]);
  return (
    <>
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <HeaderPage
        title={`${params.type} Collection`}
        paths={[
          {
            name: params.type,
            link: route.url,
          },
        ]}
      />
      <ProductsPage isLoading={isLoading} data={data} pageParam={pageParam} />
    </>
  );
};

export default TypeProduct;
