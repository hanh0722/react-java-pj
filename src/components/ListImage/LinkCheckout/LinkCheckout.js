import React, { useEffect } from "react";
import styles from "./LinkCheckOut.module.scss";
import { Button } from "@material-ui/core";
import useQuantity from "../../../hook/use-quantity";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
import useCart from "../../../hook/use-cart";
import { useDispatch } from "react-redux";
import { CartActions } from "../../store/cart";
import { NotifyActions } from "../../store/NotifyAfterLogin/NotifyAfterLogin";
const LinkCheckOut = ({ url, isLoading, product }) => {
  const { incrementHandler, decrementHandler, quantity, setQuantity } =
    useQuantity();
  const dispatch = useDispatch();
  const {
    addCartHandler,
    error,
    data,
    isLoading: isLoadingAddCart,
  } = useCart();
  useEffect(() => {
    if (!isLoadingAddCart && data && !error) {
      dispatch(
        CartActions.addToCartHandler({
          id: data.data.id,
          name: data.data.title,
          imageUrl: data.data.imageUrls[0],
          quantity: quantity,
          price: data.data.lastPrice,
          type: data.data.category,
        })
      );
      dispatch(CartActions.showCartHandler());
    }
    if (!isLoadingAddCart && error) {
      dispatch(
        NotifyActions.showedNotify({
          message: "Cannot add to cart",
          code: 500,
        })
      );
    }
  }, [isLoadingAddCart, data, dispatch, quantity, error]);
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
                  <p>${product.lastPrice}</p>
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
                <Button
                  onClick={() => addCartHandler(quantity, product.id)}
                  variant="outlined"
                >
                  Add To Cart
                </Button>
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
