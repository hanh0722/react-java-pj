import React from "react";
import p1 from "../image/email-sent-success-verify.png";
import styles from "../components/Success/Success.module.scss";
import Container from "../components/layout/container/Container";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SIGN_IN_PAGE } from "../components/link/link";
const SuccessVerified = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.image}>
        <img src={p1} alt="banner" />
      </div>
      <div className="text-center pt-3" style={{ lineHeight: "35px" }}>
        <p>Your account verified successfully</p>
        <p>Thank you for choosing us, happy shopping!</p>
      </div>
      <div className={styles.button}>
        <Link to={SIGN_IN_PAGE}>
          <Button variant="contained">Login to shopping now!</Button>
        </Link>
      </div>
    </Container>
  );
};

export default SuccessVerified;
