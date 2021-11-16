import React from "react";
import banner from "../../image/banner.jpeg";
import { Col } from "react-bootstrap";
import BannerImages from "../layout/Banner-images/BannerImages";
const Banner = () => {
  return (
    <Col data-aos='fade-left' xs={12} sm={12} md={6} lg={6}>
      <BannerImages>
        <img src={banner} alt="banner" />
      </BannerImages>
    </Col>
  );
};

export default Banner;
