import React from "react";
import LineCart from "./LineCart/LineCart";
import styles from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Layout from "./Layout/Layout";
import useToggle from "../../../hook/use-toggle";
import { CSSTransition } from "react-transition-group";
import "./Transition.scss";
import { Button } from "@material-ui/core";
import NorInput from "../../input/NormalInput/NorInput";
import useInput from "../../../hook/use-input";
import { checkInputIsEmpty } from "../../../util";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
import { useSelector } from "react-redux";
const Cart = ({ cart, isLoadingCart }) => {
  const { toggle, changeToggleHandler } = useToggle();
  const { value, valid, isTouched, changeInputHandler, touchedInputHandler } =
    useInput((value) => checkInputIsEmpty(value));
  const cartCheckout = useSelector((state) => state.cartCheckout);
  return (
    <>
      <div className={styles.Cart}>
        {isLoadingCart && (
          <>
            <div className={styles["loading-total"]}>
              <Skeleton
                src
                times={5}
                containerSkeleton={styles["loading-skeleton"]}
                imageClassName={styles["image-loading"]}
              />
              <Skeleton
                src
                times={5}
                containerSkeleton={styles["loading-skeleton"]}
                imageClassName={styles["image-loading"]}
              />
              <Skeleton
                src
                times={5}
                containerSkeleton={styles["loading-skeleton"]}
                imageClassName={styles["image-loading"]}
              />
            </div>
          </>
        )}
        {!isLoadingCart && cart.length > 0 && (
          <>
            <div className={`${cart.length > 2 && styles.flow}`}>
              {cart.map((item) => {
                return (
                  <LineCart
                    key={item.id}
                    productName={item.name}
                    url={item.imageUrl}
                    price={item.price}
                    total={item.price * item.quantity}
                    quantity={item.quantity}
                    productType={item.type}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      <Layout>
        <span>Subtotal:</span>
        <span>${cartCheckout.first_price}</span>
      </Layout>
      <Layout className={"align-items-center"}>
        <span>Voucher:</span>
        {!toggle && (
          <Button
            onClick={changeToggleHandler}
            variant="contained"
            className={styles.btn}
          >
            Apply Voucher
          </Button>
        )}
        <CSSTransition
          in={toggle}
          timeout={500}
          mountOnEnter
          unmountOnExit
          classNames="open--voucher"
        >
          <Layout className={styles.discount}>
            <div className={styles.invalid}>
              <NorInput
                input={{
                  type: "text",
                  value: value,
                  onChange: changeInputHandler,
                  onBlur: touchedInputHandler,
                  autoComplete: "off",
                  placeholder: "Voucher...",
                }}
                className={`${styles.voucher} ${
                  !valid && isTouched && "error__input"
                }`}
              >
                <FontAwesomeIcon icon={faTag} />
              </NorInput>
              {!valid && isTouched && (
                <p className={`${styles.error} error__text`}>
                  Voucher is empty!
                </p>
              )}
              <div className="text-end pt-3">
                <Button
                  onClick={changeToggleHandler}
                  variant="outlined"
                  className={styles["cancel-button"]}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Layout>
        </CSSTransition>
        {/* {toggle && <span>20%</span>} */}
      </Layout>
      <Layout>
        <span>Total:</span>
        <span>${cartCheckout.total}</span>
      </Layout>
    </>
  );
};

export default React.memo(Cart);
