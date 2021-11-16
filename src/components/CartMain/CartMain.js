import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ButtonItem from "../UI/Button/Button";
import styles from "./CartMain.module.scss";
import Item from "./Item/Item";
import Overlay from "../overlay/Overlay";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import ApplyVoucher from "../ApplyVoucher/ApplyVoucher";
import { CSSTransition } from "react-transition-group";
import { CartActions } from "../store/cart";
import "../CSSTransition/CSSTransition.scss";
import { Link } from "react-router-dom";
import { CHECK_OUT_PAGE } from "../link/link";
import useAxios from "../../hook/use-axios";
import { getCartOfUser } from "../../config/cart";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
const CartMain = () => {
  const token = useSelector((state) => state.isAuth.token);
  const isLoggedIn = useSelector((state) => state.isAuth.isLoggedIn);
  const cart = useSelector((state) => state.cart.cart);
  const isShowCart = useSelector((state) => state.cart.showCart);
  const total = useSelector(state => state.cart.total);
  const discount = useSelector(state => state.cart.discount);
  const dispatch = useDispatch();
  const { isLoading, data, fetchDataFromServer, error } = useAxios();
  const [showVoucher, setShowVoucher] = useState(false);
  useEffect(() => {
    if (!token || !isLoggedIn) {
      return;
    }
    fetchDataFromServer({
      url: getCartOfUser,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }, [fetchDataFromServer, token, isLoggedIn]);
  useEffect(() => {
    if (isLoading) {
      dispatch(CartActions.startLoadingCartHandler());
    }
    if (!isLoading && !error && data) {
      dispatch(CartActions.finishLoadingCartHandler());
      const transformCart = data.data.cart.map((product) => {
        return {
          id: product._id,
          name: product.title,
          imageUrl: product.images.urls[0],
          quantity: product.quantity,
          price: product.last_price,
          type: product.type_product,
        };
      });
      dispatch(CartActions.setCartHandler(transformCart));
    }
  }, [isLoading, error, data, dispatch]);
  const renderSkeleton = (number) => {
    const arraySkeleton = [];
    for (let i = 0; i < number; i++) {
      arraySkeleton.push(
        <Skeleton
          key={i}
          src
          className={styles["loading-cart"]}
          imageClassName={styles["image-loading"]}
          containerSkeleton={styles["container-loading"]}
          times={5}
        />
      );
    }
    return arraySkeleton;
  };
  useEffect(() => {
    if (isShowCart) {
      document.body.setAttribute("data-sp", "open");
    } else {
      document.body.removeAttribute("data-sp");
    }
  }, [isShowCart]);
  return (
    <>
      <div className={`${styles.cart} ${isShowCart && styles["cart__back"]}`}>
        <CSSTransition
          in={showVoucher}
          timeout={500}
          unmountOnExit
          mountOnEnter
          classNames="fade__bg"
        >
          <div
            onClick={() => setShowVoucher(false)}
            className={styles["bg__overlay"]}
          ></div>
        </CSSTransition>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.title}`}
        >
          <h4>Shopping Cart</h4>
          <ButtonItem onClick={() => dispatch(CartActions.showCartHandler())} />
        </div>
        <div
          className={`${styles["cart__items"]} ${
            cart.length === 0 &&
            "d-flex justify-content-center align-items-center"
          }`}
        >
          {isLoading && renderSkeleton(2)}
          {!isLoading && (
            <>
              {cart.length === 0 && <p>Your cart is empty.</p>}
              {cart.map((item) => {
                return (
                  <Item
                    key={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    quantity={item.quantity}
                    id={item.id}
                    type={item.type}
                  />
                );
              })}
            </>
          )}
        </div>

        <div className={styles["checkout__box"]}>
          <section className={isLoading ? styles["voucher--loading"] : ""}>
            {isLoading && (
              <Skeleton
                src
                times={3}
                className="flex-column"
                containerSkeleton="w-100 pt-3"
                imageClassName={styles["image-loading"]}
              />
            )}
            {!isLoading && cart.length > 0 && (
              <>
                <div
                  onClick={() => setShowVoucher(true)}
                  className={`text-center ${styles.coupon}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="14"
                    viewBox="0 0 21 14"
                  >
                    <path d="M15.2812 3.875c.2344 0 .4336.08203.5977.24609.1641.16407.2461.36328.2461.59766v5.0625c0 .23435-.082.43355-.2461.59765-.1641.1641-.3633.2461-.5977.2461H5.71875c-.23437 0-.43359-.082-.59766-.2461-.16406-.1641-.24609-.3633-.24609-.59765v-5.0625c0-.23438.08203-.43359.24609-.59766.16407-.16406.36329-.24609.59766-.24609h9.56245zM15 9.5V5H6v4.5h9zm4.5-3.375c-.3047 0-.5742.11719-.8086.35156-.2109.21094-.3164.46875-.3164.77344s.1055.57422.3164.80859c.2344.21094.5039.31641.8086.31641h1.125v3.9375c0 .4687-.1641.8672-.4922 1.1953-.3281.3281-.7266.4922-1.1953.4922H2.0625c-.46875 0-.86719-.1641-1.195312-.4922C.539062 13.1797.375 12.7812.375 12.3125V8.375H1.5c.30469 0 .5625-.10547.77344-.31641.23437-.23437.35156-.5039.35156-.80859s-.11719-.5625-.35156-.77344C2.0625 6.24219 1.80469 6.125 1.5 6.125H.375V2.1875c0-.46875.164062-.86719.492188-1.195312C1.19531.664063 1.59375.5 2.0625.5h16.875c.4687 0 .8672.164063 1.1953.492188.3281.328122.4922.726562.4922 1.195312V6.125H19.5zm0 3.375c-.6094 0-1.1367-.22266-1.582-.66797-.4453-.44531-.668-.97265-.668-1.58203s.2227-1.13672.668-1.58203C18.3633 5.22266 18.8906 5 19.5 5V2.1875c0-.16406-.0586-.29297-.1758-.38672-.0937-.11719-.2226-.17578-.3867-.17578H2.0625c-.16406 0-.30469.05859-.42188.17578-.09374.09375-.14062.22266-.14062.38672V5c.60938 0 1.13672.22266 1.58203.66797.44531.44531.66797.97265.66797 1.58203s-.22266 1.13672-.66797 1.58203C2.63672 9.27734 2.10938 9.5 1.5 9.5v2.8125c0 .1641.04688.3047.14062.4219.11719.0937.25782.1406.42188.1406h16.875c.1641 0 .293-.0469.3867-.1406.1172-.1172.1758-.2578.1758-.4219V9.5z"></path>
                  </svg>
                  <p>Coupon</p>
                </div>
              </>
            )}
          </section>
          <div className={styles.checkout}>
            {isLoading && (
              <Skeleton times={2} containerSkeleton={styles["check-loading"]} />
            )}
            {!isLoading && (
              <>
                <p
                  className={`${styles.subtotal} d-flex justify-content-between align-items-center pb-3`}
                >
                  <span>Subtotal: </span>
                  <span>${total}</span>
                </p>
                <p
                  className={`${styles.subtotal} d-flex justify-content-between align-items-center pb-3`}
                >
                  <span>Discount:</span>
                  <span>{discount}%</span>
                </p>
                {cart.length > 0 && (
                  <Link to={CHECK_OUT_PAGE}>
                    <Button variant="contained" type="submit">
                      Checkout
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
        <ApplyVoucher showVoucher={showVoucher} />
      </div>
      {isShowCart &&
        ReactDOM.createPortal(
          <Overlay
            onClick={() => dispatch(CartActions.showCartHandler())}
            style={{ zIndex: "20" }}
          />,
          document.getElementById("ol__cart")
        )}
    </>
  );
};

export default React.memo(CartMain);
