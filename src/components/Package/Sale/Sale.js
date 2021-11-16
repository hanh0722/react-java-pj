import React from "react";
import { Button } from "@material-ui/core";
import LineSale from "../../LineSale/LineSale";
import styles from "./Sale.module.scss";
const DUMMY_LIST = [
  {
    name: "PEPEROMIA OBTUSIFOLIA",
    price: "75",
    imageUrl: require("../../../image/indoor-2.jpeg").default,
  },
  {
    name: "FICUS TINEKE",
    price: "39.99",
    imageUrl: require("../../../image/indoor-3.jpeg").default,
  }
];
const Sale = () => {
  return (
    <div className={`text ${styles.sale}`}>
      <h4>{"Bundle & Sale"}</h4>
      <h2>Build Your Own Basket From $100</h2>
      <div className={styles.content}>
        {DUMMY_LIST.map((product, indexProd) => {
          let price = product.price;
          if (Number.isInteger(+product.price)) {
            let newPriceDecimal = `${product.price}.00`;
            price = newPriceDecimal;
          }
          return (
            <LineSale
              key={indexProd}
              number={indexProd + 1}
              name={product.name}
              price={price}
              imageUrl={product.imageUrl}
            />
          );
        })}
      </div>
      <div className={styles.button}>
        <Button className="w-100" variant="contained">
          Add To Cart
          <span className={styles.price}>$75.00</span>
        </Button>
      </div>
    </div>
  );
};

export default Sale;
