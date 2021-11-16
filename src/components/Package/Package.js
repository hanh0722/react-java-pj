import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "../layout/container/Container";
import Content from "../layout/Content/Content";
import Sale from "./Sale/Sale";
import p1 from "../../image/banner-2.jpeg";
import BannerImages from "../layout/Banner-images/BannerImages";
import SmallButton from "../SmallButton/SmallButton";
import Information from "./Information/Information";
import styles from "./Package.module.scss";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../hook/use-toggle";

const Package = () => {
  const { toggle, changeToggleHandler } = useToggle(false);
  return (
    <Content>
      <Container>
        <Row className={`justify-content-between align-items-center`}>
          <Col data-aos="fade-right" xs={12} sm={12} md={6} lg={6}>
            <Sale />
          </Col>
          <Col data-aos="fade-right" xs={12} sm={12} md={6} lg={6}>
            <BannerImages className={styles.banner}>
              <div style={{ position: "relative" }}>
                <img src={p1} alt="banner-3" />
                <SmallButton onClick={changeToggleHandler}>
                  <FontAwesomeIcon icon={faFeatherAlt} />
                </SmallButton>
                <CSSTransition
                  in={toggle}
                  timeout={500}
                  mountOnEnter
                  unmountOnExit
                  classNames="scale"
                >
                  <Information style={{ top: "33%", right: "28%" }}>
                    <div className={styles.image}>
                      <img
                        src={require("../../image/indoor-1.jpeg").default}
                        alt=""
                      />
                    </div>
                    <Link to="/">Snake Plant Laurenti</Link>
                    <p>$40.00</p>
                  </Information>
                </CSSTransition>
              </div>
            </BannerImages>
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Package;
