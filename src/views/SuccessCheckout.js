import React from "react";
import { Container } from "react-bootstrap";
import styles from "../components/CheckoutAsset/Checkout/SuccessCheckout.module.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HOME_PAGE } from "../components/link/link";
const SuccessCheckout = () => {
  return (
    <Container>
      <div className={styles.container}>
        <img src="/success-5025797_1280.png" alt="" />
        <p>Thank you for buying items in our store</p>
        <p>
          We will deliver as soon as possible, if you have any question, please
          contact us
        </p>
        <Link to={HOME_PAGE}>
          <Button variant="contained" className={styles.button}>
            Back to home page
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default SuccessCheckout;
