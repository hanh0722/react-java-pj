import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import styles from "./ContentBanner.module.scss";
import { SHOP } from "../link/link";
import Ripple from '../UI/Ripple/Ripple';
const ContentBanner = () => {
  return (
    <Col
      data-aos="fade-right"
      className={styles.text}
      xs={12}
      sm={12}
      md={6}
      lg={6}
    >
      <p>
        <span className={styles.thumb}>HOT</span> 25% off everything (yes,
        everything!) 🔥
      </p>
      <h2>Why plants make you happy</h2>
      <Ripple className={styles.ripple}>
        <p>
          <Link to={SHOP}>
            Shop Collection <span className={styles.hover}></span>
          </Link>
        </p>
      </Ripple>
    </Col>
  );
};

export default ContentBanner;
