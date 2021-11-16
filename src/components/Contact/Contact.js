import React from "react";
import { Row, Col } from "react-bootstrap";
import Map from "../Map/Map";
import FormContact from "./FormContact/FormContact";
import Content from "../layout/Content/Content";
import Container from "../layout/container/Container";
import styles from "./Contact.module.scss";
const Contact = () => {
  return (
    <Content>
      <Container>
        <div className="text text-center">
          <h4>We're looking forward to see you and serve with our services</h4>
          <h2>Contact Us Today!</h2>
        </div>
        <Row className="align-items-center">
          <Col xs={12} sm={12} md={6} lg={6}>
            <FormContact />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className={styles["map--col"]}>
            <Map />
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Contact;
