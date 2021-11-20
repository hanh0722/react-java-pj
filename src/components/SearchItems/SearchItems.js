import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SearchItems.module.scss";
const SearchItems = ({
  imageUrl,
  name,
  type,
  price,
  url,
}) => {
  // const { isLoading, data, error, addCartHandler } = useCart();
  // const dispatch = useDispatch();
  // const addToCartHandler = () => {
  //   // dispatch(
  //   //   CartActions.addToCartHandler({
  //   //     imageUrl,
  //   //     name,
  //   //     type,
  //   //     price,
  //   //     id,
  //   //   })
  //   // );
  //   addCartHandler(1, id);
  //   dispatch(CartActions.showCartHandler());
  //   dispatch(hamburgerActions.searchSlide());
  //   resetHandler();
  // };
  // console.log(isLoading, data, error);

  return (
    <Col className={styles.col} xs={6} sm={4} md={3} lg={2}>
      <div className={styles["product__item"]}>
        <div className={styles.image}>
          <img src={imageUrl} alt="" />
          {/* <div className={styles.watch}>
            <span
              onClick={() => {
                addToCartHandler();
              }}
            >
              <FontAwesomeIcon icon={faCartPlus} />
            </span>
          </div> */}
        </div>
        <div className={styles.information}>
          <p className={styles.name}>
            <Link to={url}>{name}</Link>
          </p>
          <p className={styles.type}>Type: {type}</p>
          <p>${price}</p>
        </div>
      </div>
    </Col>
  );
};

export default React.memo(SearchItems);
