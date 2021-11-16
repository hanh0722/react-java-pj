import React from "react";
import Grid from "../UI/Grid/Grid";
import Container from "../layout/container/Container";
import Product from "../Product/Product";
import RenderSkeletonProduct from "../../util/RenderSkeletonProduct";
import Pagination from "../Pagination/Pagination";
import nonAccentVietnamese from "../removeUnicode/removeUnicode";
const ProductsPage = ({ isLoading, data, pageParam }) => {
  return (
    <Container>
      <Grid>
        {isLoading && RenderSkeletonProduct(8)}
        {!isLoading &&
          data &&
          data.data.products.map((item) => {
            const path = nonAccentVietnamese(item.title);
            return (
              <Product
                key={item._id}
                imageUrl={item.images.urls[0]}
                price={item.last_price}
                name={item.title}
                id={item._id}
                link={`/shop/${path}?id=${item._id}`}
              />
            );
          })}
      </Grid>
      {!isLoading && data && (
        <Pagination
          currentPage={pageParam}
          totalPage={data?.data?.total_product}
          perPage={8}
        />
      )}
    </Container>
  );
};

export default ProductsPage;
