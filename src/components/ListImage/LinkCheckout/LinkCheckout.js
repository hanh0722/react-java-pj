import React from "react";
import styles from "./LinkCheckOut.module.scss";
import { Button } from "@material-ui/core";
import useQuantity from "../../../hook/use-quantity";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
const LinkCheckOut = ({ url, isLoading, product }) => {
  const { incrementHandler, decrementHandler, quantity, setQuantity } =
    useQuantity();
  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.link} d-flex justify-content-between align-items-center w-100`}
        >
          <div className={`${styles.image} d-flex align-items-center`}>
            {isLoading && (
              <>
                <Skeleton src imageClassName={styles["loading-image"]} />
                <Skeleton
                  times={2}
                  containerSkeleton={styles["container-loading"]}
                />
              </>
            )}
            {!isLoading && product && (
              <>
                <img src={url} alt="" />
                <div className="ms-3">
                  <p>{product.title}</p>
                  <p>${product.last_price}</p>
                </div>
              </>
            )}
          </div>
          {!isLoading && (
            <div className={`${styles.addToCart} w-70 d-flex`}>
              <div className={`d-flex align-items-center ${styles.quantity}`}>
                <div
                  onClick={decrementHandler}
                  className="d-flex justify-content-center align-items-center"
                >
                  -
                </div>
                <input
                  onChange={(e) => setQuantity(+e.target.value)}
                  className="text-center"
                  value={quantity}
                  type="number"
                  min="1"
                  max="100"
                />
                <div
                  onClick={incrementHandler}
                  className="d-flex justify-content-center align-items-center"
                >
                  +
                </div>
              </div>
              <div className={styles.add}>
                <Button variant="outlined">Add To Cart</Button>
                <Button variant="contained">Buy It Now</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkCheckOut;
