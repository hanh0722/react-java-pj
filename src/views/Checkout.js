import React from "react";
import HeaderPage from "../components/HeaderPage/HeaderPage";
import { useRouteMatch } from "react-router-dom";
import CheckoutPage from "../components/CheckoutAsset/Checkout/Checkout";
const Checkout = () => {
  const route = useRouteMatch();
  const pathsItem = [
    {
      link: route.path,
      name: "Checkout",
    },
  ];
  return (
    <>
      <HeaderPage title="Checkout" paths={pathsItem} />
      <CheckoutPage />
    </>
  );
};

export default Checkout;
