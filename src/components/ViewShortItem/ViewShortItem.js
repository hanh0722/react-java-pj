import { Button } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./ViewShortItem.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Overlay from "../overlay/Overlay";
import ReactDOM from "react-dom";
import "../CSSTransition/CSSTransition.scss";
import { ProductActions } from "../store/Product";
import { CartActions } from "../store/cart";
import useAxios from "../../hook/use-axios";
import { getProductById } from "../../config/product/product";
import { randomElements } from "../../util/random-array";
import nonAccentVietnamese from "../removeUnicode/removeUnicode";
import ParseHTML from "../../util/ParseHTML";
import useQuantity from "../../hook/use-quantity";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
import useCart from "../../hook/use-cart";
const ViewShortItem = () => {
  const itemId = useSelector((state) => state.product.idProduct);
  const showModel = useSelector((state) => state.product.showModel);
  const {
    isLoading: isLoadingAddCart,
    data: dataAddCart,
    addCartHandler,
  } = useCart();
  const dispatch = useDispatch();
  const { isLoading, error, data, fetchDataFromServer } = useAxios();
  const { incrementHandler, decrementHandler, quantity, setQuantity } =
    useQuantity(1);
  useEffect(() => {
    if (!itemId) {
      return;
    }
    fetchDataFromServer({
      url: getProductById(itemId),
    });
    // find in DB and fetch from server
    // mongoDB: find(_id: new mongodb.objectId(id))
  }, [itemId, fetchDataFromServer]);
  const changeQuantityHandler = (event) => {
    setQuantity(+event.target.value);
  };
  const addItemToCartHandler = (event) => {
    event.preventDefault();
    addCartHandler(quantity, itemId);
  };
  const resetHandler = useCallback(() => {
    dispatch(ProductActions.setShowModalHandler());
    setTimeout(() => {
      dispatch(ProductActions.removeProduct());
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoadingAddCart && dataAddCart) {
      dispatch(
        CartActions.addToCartHandler({
          id: dataAddCart.data._id,
          name: dataAddCart.data.title,
          imageUrl: dataAddCart.data.imageUrls[0],
          quantity: quantity,
          price: dataAddCart.data.lastPrice,
          type: dataAddCart.data?.category,
        })
      );
      dispatch(CartActions.showCartHandler());
      resetHandler();
    }
  }, [dispatch, resetHandler, isLoadingAddCart, dataAddCart, quantity]);
  const _renderRandomImage = useMemo(() => {
    if (data) {
      return randomElements(data.data.imageUrls).valueRandom;
    }
  }, [data]);
  return (
    //   problem with animation because <div> render nothing in here
    <>
      <form onSubmit={addItemToCartHandler}>
        <CSSTransition
          in={showModel}
          timeout={500}
          unmountOnExit
          mountOnEnter
          classNames={"view"}
        >
          <div className={styles.view}>
            {isLoading && (
              <div className={styles.loading}>
                <Skeleton
                  containerSkeleton={styles["container-loading"]}
                  imageClassName={styles["image-loading"]}
                  src
                  times={8}
                />
              </div>
            )}
            {!isLoading && data && (
              <>
                <div className={styles.image}>
                  <img src={_renderRandomImage} alt="" />
                </div>
                <div
                  className={`${styles["product__info"]} d-flex flex-column justify-content-between`}
                >
                  <div className={styles["content__product"]}>
                    <Link
                      className={styles.text}
                      to={`/shop/${nonAccentVietnamese(data.data.title)}?id=${
                        data.data.id
                      }`}
                    >
                      {data.data.title}
                    </Link>
                    <p>Price: ${data.data.lastPrice}</p>
                    <div className={styles.content}>
                      <ParseHTML string={data.data.description} />
                    </div>
                    <div className={styles.type}>
                      Style:{" "}
                      <span className={styles.text}>{data.data.category}</span>
                    </div>
                  </div>
                  <div
                    className={`d-flex justify-content-between align-items-center ${styles.row}`}
                  >
                    <div
                      className={`${styles.quantity} d-flex justify-content-center align-items-center`}
                    >
                      <div onClick={decrementHandler}>-</div>
                      <input
                        onChange={changeQuantityHandler}
                        value={quantity}
                        type="number"
                        min="1"
                        max="100"
                      />
                      <div onClick={incrementHandler}>+</div>
                    </div>
                    <Button type="submit" variant="contained">
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
            {!isLoading && error && (
              <p className="error__text">Cannot get data, please try again!</p>
            )}
          </div>
        </CSSTransition>
        {showModel &&
          ReactDOM.createPortal(
            <Overlay onClick={resetHandler} style={{ zIndex: "20" }} />,
            document.getElementById("product__bg")
          )}
      </form>
    </>
  );
};

export default React.memo(ViewShortItem);
