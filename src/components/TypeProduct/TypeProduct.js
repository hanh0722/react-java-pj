import React from "react";
import Grid from "../UI/Grid/Grid";
import Container from "../layout/container/Container";
import Product from "../Product/Product";
import RenderSkeletonProduct from "../../util/RenderSkeletonProduct";
import Pagination from "../Pagination/Pagination";
import nonAccentVietnamese from "../removeUnicode/removeUnicode";
import styles from './TypeProduct.module.scss';
const ProductsPage = ({ isLoading, data, pageParam }) => {
  return (
    <Container>
      {!isLoading && data && data?.data?.total_documents === 0 && (
          <div className={`${styles.box} d-flex justify-content-center align-items-center`}>
            <p>No products found!</p>
          </div>
        )}
      <Grid>
        {isLoading && RenderSkeletonProduct(8)}
        {!isLoading &&
          data &&
          data?.data?.total_documents > 0 &&
          data.data.products.map((item) => {
            const path = nonAccentVietnamese(item.title);
            return (
              <Product
                key={item._id}
                imageUrl={item.image_urls[0]}
                price={item.last_price}
                name={item.title}
                id={item._id}
                link={`/shop/${path}?id=${item._id}`}
              />
            );
          })}
      </Grid>
      {!isLoading && data && data?.data?.total_documents > 0 && (
        <Pagination
          currentPage={pageParam}
          totalPage={data?.data?.total_documents}
          perPage={8}
        />
      )}
    </Container>
  );
};

export default ProductsPage;
