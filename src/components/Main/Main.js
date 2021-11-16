import React from "react";
import Container from "../layout/container/Container";
import Banner from "../Banner/Banner";
import ContentBanner from "../ContentBanner/ContentBanner";
import { Row } from "react-bootstrap";
import styles from "./Main.module.scss";
const Main = () => {
  return (
    <>
    <Container className={styles.container}>
    <div className={styles.background}></div>
      <Row className={`justify-content-between align-items-center flex-row-reverse ${styles.line}`}>
        <Banner />
        <ContentBanner />
      </Row>
    </Container>
    </>
  );
};

export default Main;
