import React, { useMemo } from "react";
import styles from "./MoreDetail.module.scss";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { styleDetailActions } from "../../store/style-detail";
import Delivery from "../LayoutDelivery/Delivery";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
import { randomElements } from "../../../util/random-array";
import ReactHTMLParser from "react-html-parser";

const MoreDetail = ({ isLoading, detail }) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.detail.content);
  const renderImage = useMemo(() => {
    if(!detail){
      return;
    }
    return randomElements(detail.images.urls).valueRandom;
  }, [detail]);
  return (
    <div>
      <div
        className={`${styles.content} d-flex justify-content-center align-items-center`}
      >
        <p
          onClick={() => dispatch(styleDetailActions.getIntroduction())}
          className={!content ? styles.active : ""}
        >
          Product Description
        </p>
        <p
          onClick={() => dispatch(styleDetailActions.getShippingAndReturn())}
          className={content ? styles.active : ""}
        >
          Shipping & Returns
        </p>
      </div>
      <Row className={styles.introduce}>
        <Col xs={12} sm={12} md={4} lg={4} className={styles.image}>
          {!isLoading && detail && (
            <img src={renderImage} alt="" />
          )}
          {isLoading && (
            <Skeleton imageClassName={styles["loading-image"]} src />
          )}
        </Col>
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          className={styles["content__product"]}
        >
          {!content ? (
            <>
              {isLoading && (
                <Skeleton
                  classSkeleton={styles["ld-text"]}
                  className={styles["container--text"]}
                  times={15}
                />
              )}
              {!isLoading && detail && (
                <>
                  <div className={styles["infor-product"]}>
                    {ReactHTMLParser(detail.description)}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <p>
                So beautiful you’ll want to show it off, so comfortable you’ll
                forget it’s there. Our 24/7™ Lace Contour Plunge Bra combines
                gorgeous floral lace with sheer overlay straps that hold you in
                and eliminates gaping. Removable pads let you customize you
              </p>
              <Delivery className="none" />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MoreDetail;
