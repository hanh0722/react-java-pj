import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SearchItems.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faEye, faStar } from "@fortawesome/free-regular-svg-icons";
import { CartActions } from "../store/cart";
import { useDispatch } from "react-redux";
import { hamburgerActions } from "../store/hamburgerSlice";
import { ProductActions } from "../store/Product";
const SearchItems = ({ imageUrl, name, type, price, id, resetHandler }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      CartActions.addToCartHandler({
        imageUrl,
        name,
        type,
        price,
        id,
      })
    );
    dispatch(CartActions.showCartHandler());
    dispatch(hamburgerActions.searchSlide());
    resetHandler();
  };

  return (
    <Col className={styles.col} xs={6} sm={4} md={3} lg={2}>
      <div className={styles["product__item"]}>
        <div className={styles.image}>
          <img src={imageUrl} alt="" />
          <div className={styles.watch}>
            <span onClick={() => {dispatch(ProductActions.setIdProduct(id));  dispatch(ProductActions.setShowModalHandler())}}>
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span
              onClick={() => {
                addToCartHandler();
              }}
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </span>
          </div>
        </div>
        <div className={styles.information}>
          <p className={styles.name}>
            <Link to="/">{name}</Link>
          </p>
          <p className={styles.type}>Type: {type}</p>
          <p>${price}</p>
        </div>
      </div>
    </Col>
  );
};

export default React.memo(SearchItems);
