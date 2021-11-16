import React from "react";
import styles from "./LineCart.module.scss";
const LineCart = ({quantity, url, productName, price, total, productType}) => {
  return (
    <div className={styles["item--cart"]}>
      <div className="d-flex align-items-center">
        <div className={styles.image}>
          <img src={url} alt="" />
          <div
            className={`${styles.quantity} d-flex justify-content-center align-items-center`}
          >
            {quantity}
          </div>
        </div>
        <div className={styles.infor}>
          <p>{productName}</p>
          <p>Type: {productType}</p>
        </div>
      </div>
      <div className={styles['container-price']}>
        <p className={styles.price}>${price}</p>
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default LineCart;
