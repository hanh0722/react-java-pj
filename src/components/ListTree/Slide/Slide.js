import React, { useEffect } from "react";
import styles from "./Slide.module.scss";
import { Link } from "react-router-dom";
import { faStar, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartActions } from "../../store/cart";
import { useDispatch } from "react-redux";
import { ProductActions } from "../../store/Product";
import useCart from "../../../hook/use-cart";
import { NotifyActions } from "../../store/NotifyAfterLogin/NotifyAfterLogin";
const Slide = ({ imageUrl, name, price, type, id, addtoWishList }) => {
  const dispatch = useDispatch();
  const { isLoading, error, data, addCartHandler } = useCart();
  const addToCartHandler = () => {
    addCartHandler(1, id);
    // will only send id when using BE
  };
  const setIdAndOpenModal = (id) => {
    dispatch(ProductActions.setIdProduct(id));
    dispatch(ProductActions.setShowModalHandler());
  };
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(
        CartActions.addToCartHandler({
          imageUrl,
          name,
          price,
          type,
          id,
        })
      );
      dispatch(CartActions.showCartHandler());
    }
    if (!isLoading && error) {
      dispatch(NotifyActions.showedNotify({
        code: error.code,
        message: error.message
      }))
    }
  }, [isLoading, data, dispatch, id, imageUrl, name, price, type, error]);
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Link to="/">
          <img src={imageUrl} alt="" />
        </Link>
        <div className={styles["options-image"]}>
          <p>
            <FontAwesomeIcon
              onClick={() =>
                addtoWishList({
                  productId: id,
                  name,
                  price,
                  type,
                  imageUrl,
                })
              }
              icon={faStar}
            />
          </p>
          <p onClick={() => setIdAndOpenModal(id)} className={styles.watch}>
            <FontAwesomeIcon icon={faEye} />
          </p>
          <p onClick={addToCartHandler}>
            <FontAwesomeIcon icon={faCartPlus} />
          </p>
        </div>
      </div>
      <div className={`${styles.content} text-center`}>
        <Link to="/">{name}</Link>
        <p className={styles.type}>Type: {type}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default Slide;
