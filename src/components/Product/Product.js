import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.scss";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { CartActions } from "../store/cart";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
import useCart from "../../hook/use-cart";
const Product = (props) => {
  const { isLoading, data, addCartHandler: addCartToServer, error } = useCart();
  const dispatch = useDispatch();
  const addCartHandler = () => {
    addCartToServer(1, props.id);
  };
  useEffect(() => {
    if (!isLoading && data && !error) {
      dispatch(
        CartActions.addToCartHandler({
          id: data.data.id,
          name: data.data.title,
          imageUrl: data.data.imageUrls[0],
          quantity: 1,
          price: data.data.lastPrice,
          type: data.data.category,
        })
      );
      dispatch(CartActions.showCartHandler());
    }
  }, [data, isLoading, error, dispatch]);
  return (
    <div className={styles.container} style={props.style}>
      <div className={`${styles.col}`}>
        {props.isLoading && (
          <Skeleton src imageClassName={styles.loading} times={0} />
        )}
        {!props.isLoading && (
          <>
            <img src={props.imageUrl} alt="ImageItem" />
            <div className={styles.overlay}>
              {/* <div
                className={`${styles.icon} d-flex justify-content-center align-items-center`}
              >
                <FontAwesomeIcon icon={faStar} />
              </div> */}
              <div className={styles.btn}>
                <Button onClick={addCartHandler} variant="contained">
                  Add to cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.item}>
        {props.isLoading ? (
          <Skeleton times={3} classSkeleton="mb-2 mt-2" />
        ) : (
          <>
            <Link to={`${props.link}`}>{props.name}</Link>
            <p>${props.price}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
