import React from "react";
import { useRouteMatch } from "react-router-dom";
import Container from "../components/layout/container/Container";
import ShopPage from "../components/ShopPage/ShopPage";
import HeaderPage from "../components/HeaderPage/HeaderPage";
const Shop = () => {
  const route = useRouteMatch();
  return (
    <>
      <HeaderPage
        title="Products"
        paths={[
          {
            link: route.path,
            name: "Products",
          },
        ]}
      />
      <Container>
          <ShopPage />
      </Container>
    </>
  );
};

export default Shop;
