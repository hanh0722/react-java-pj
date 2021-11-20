import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@material-ui/core";
import Methods from "../Methods/Methods";
import Delivery from "../LayoutDelivery/Delivery";
import useQuantity from "../../../hook/use-quantity";
import styles from "../../styles/DetailItem.module.scss";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
import classes from "./DetailProduct.module.scss";
import useCart from "../../../hook/use-cart";
import { useDispatch } from "react-redux";
import { CartActions } from "../../store/cart";
import { NotifyActions } from "../../store/NotifyAfterLogin/NotifyAfterLogin";
const DetailProduct = ({
  product,
  changeToggleHandler,
  setContent,
  isLoading,
}) => {
  const { incrementHandler, decrementHandler, quantity, setQuantity } =
    useQuantity(1);
  const dispatch = useDispatch();
  const {
    addCartHandler,
    error,
    isLoading: isLoadingAddCart,
    data,
    resetAllHandler,
  } = useCart();
  useEffect(() => {
    if (!error && !isLoadingAddCart && data) {
      dispatch(CartActions.showCartHandler());
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
    }
    if (!isLoadingAddCart && error) {
      dispatch(
        NotifyActions.showedNotify({
          message: "Cannot add item to cart",
          code: 500,
        })
      );
    }
    return () => {
      resetAllHandler();
    };
  }, [error, isLoadingAddCart, data, dispatch, quantity, resetAllHandler]);
  return (
    <>
      <Col
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className={`${styles["col__content"]} ${classes.container}`}
      >
        <div
          className={`${styles.title} d-flex justify-content-between align-items-center`}
        >
          <h4>
            {isLoading && <Skeleton times={1} />}
            {!isLoading && product && `${product.title}`}
          </h4>
          <div
            className={`${styles.wishlist} d-flex justify-content-center align-items-center`}
          >
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className={styles.price}>
          {isLoading && <Skeleton times={2} classSkeleton={classes.line} />}
          {!isLoading && product && (
            <>
              {product.salePercent !== 0 && (
                <p className={classes.sale}>
                  Sale: <span>{product.salePercent}%</span>{" "}
                </p>
              )}
              Price:{" "}
              {product.salePercent !== 0 && (
                <span className={classes["sale-value"]}>
                  ${product.regularPrice}
                </span>
              )}{" "}
              ${product.lastPrice}
            </>
          )}
        </div>

        {isLoading && <Skeleton times={2} classSkeleton={classes.line} />}
        {!isLoading && product && (
          <>
            <p
              className={`${styles["quantity__title"]} ${
                !product.inStock && classes["out-product"]
              }`}
            >
              In Stock: {product.inStock ? "Normal" : "Out of product"}
            </p>
            <p className={styles["quantity__title"]}>
              Type: {product.category || "Other"}
            </p>
          </>
        )}

        {!isLoading && (
          <>
            <div
              className={`${styles["add__to__cart"]} d-flex justify-content-between align-items-center`}
            >
              <div
                className={`${styles.quantity} d-flex justify-content-center align-items-center`}
              >
                <div onClick={decrementHandler} className={styles.btn}>
                  -
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(event) => setQuantity(+event.target.value)}
                  />
                </div>
                <div onClick={incrementHandler} className={styles.btn}>
                  +
                </div>
              </div>
              <div className={styles["btn__add"]}>
                <Button
                  onClick={() => addCartHandler(quantity, product.id)}
                  variant="outlined"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
            <div className={`${styles.space} w-100`}>
              <Link to="/checkout">
                <Button className="w-100" variant="contained">
                  Buy it now!
                </Button>
              </Link>
            </div>
            <Methods
              setContent={setContent}
              setChangeLayout={changeToggleHandler}
            />
            <Delivery />
          </>
        )}
      </Col>
    </>
  );
};

export default DetailProduct;
