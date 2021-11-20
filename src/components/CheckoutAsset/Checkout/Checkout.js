import React, { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Container from "../../layout/container/Container";
import Cart from "../Cart/Cart";
import FormPersonal from "../FormPersonal/FormPersonal";
import styles from "./Checkout.module.scss";
import { useSelector } from "react-redux";
import useInterval from "../../../hook/use-interval";
import { CSSTransition } from "react-transition-group";
import FixLayout from "../../FixLayout/FixLayout";
import { SHOP } from "../../link/link";
import ReactDOM from "react-dom";
import Overlay from "../../overlay/Overlay";
import { Button } from "@material-ui/core";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const discount = useSelector((state) => state.cart.discount);
  const isLoadingCart = useSelector((state) => state.cart.isLoading);
  const history = useHistory();
  const location = useLocation();

  const checkCheckoutPage = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get("id");
  }, [location.search]);

  const { time } = useInterval(5, cart.length === 0 && !checkCheckoutPage);

  useEffect(() => {
    if (cart.length > 0) {
      return;
    }
    if (time === 0 && !checkCheckoutPage) {
      history.push(SHOP);
    }
  }, [cart, history, time, checkCheckoutPage]);
  const _renderMessageError = () => {
    if (checkCheckoutPage) {
      return;
    }
    setTimeout(() => {
      return (
        <CSSTransition
          in={cart.length === 0 && time > 0 && !isLoadingCart}
          unmountOnExit
          mountOnEnter
          classNames="scale-fix"
          timeout={750}
        >
          <>
            <FixLayout>
              <div className="text-center">
                <p>Sorry, we can't checkout, your cart is empty</p>
                <p>
                  You will be redirect to shop after{" "}
                  <span className="error__text">{time}</span> seconds
                </p>
              </div>
            </FixLayout>
            {ReactDOM.createPortal(
              <Overlay />,
              document.getElementById("portal__pd")
            )}
          </>
        </CSSTransition>
      );
    }, 500);
    // setTimeout to ignore error of loading cart
  };
  return (
    <Container>
      <form>
        <Row className={`${styles["user--infor"]}`}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h3 className="text-center">Personal Information</h3>
            <FormPersonal />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h3 className="text-center">Your Cart</h3>
            {_renderMessageError()}
            {!checkCheckoutPage && (
              <Cart
                cart={cart}
                isLoadingCart={isLoadingCart}
                total={total}
                discount={discount}
              />
            )}
            <Button variant='outlined' className={styles.submit}>Checkout</Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default Checkout;
