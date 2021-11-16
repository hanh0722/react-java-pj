import React from "react";
import { Row, Col } from "react-bootstrap";
import Container from "../layout/container/Container";
import Content from "../layout/Content/Content";
import banner from "../../image/banner-1.jpeg";
import { Button } from "@material-ui/core";
import BannerImages from "../layout/Banner-images/BannerImages";
import styles from "./Landing.module.scss";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../link/link";
import { randomElements } from "../../util/random-array";
const Landing = () => {
  const mapRouteRandom = Object.entries(PRODUCTS);
  const randomByteLink = randomElements(mapRouteRandom);
  return (
    <Content>
      <div data-aos="fade-up">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} sm={12} md={6} lg={6}>
              <BannerImages>
                <img src={banner} alt="banner" />
              </BannerImages>
            </Col>
            <Col className={`${styles.content}`} xs={12} sm={12} md={6} lg={6}>
              <div className="text">
                <h4>Fresh Finds</h4>
                <h2>Deck Out Your Patio This Summer</h2>
                <p>
                  With eye-catching annual flowers and foliage you won’t find
                  anywhere else, you can mix and match our vibrant container
                  gardens to create beautiful gardens of any size.
                </p>
                <p>Choose product you want now! - <span style={{textTransform: 'capitalize'}}>{randomByteLink.valueRandom[0].toLowerCase()}</span></p>
                <Link to={randomByteLink.valueRandom[1]}>
                  <Button className={styles.button} variant="contained">
                    Shop {randomByteLink.valueRandom[0].toLowerCase()}
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Content>
  );
};

export default Landing;
