import React from "react";
import { Link } from "react-router-dom";
import Container from "../layout/container/Container";
import Content from "../layout/Content/Content";
import styles from "./PageItems.module.scss";
import p1 from "../../image/banner-3.jpeg";
const PageItems = () => {
  return (
    <Content>
      <Container>
        <div data-aos='fade-down' className={`${styles.items} text text-center`}>
          <h4>Our Scissors Collection</h4>
          <h2>The Pruning Scissors</h2>
          <Link to="/">Shop Collection</Link>
          <img src={p1} alt="" />
        </div>
      </Container>
    </Content>
  );
};

export default PageItems;
