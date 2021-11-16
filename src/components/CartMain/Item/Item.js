import React, { useEffect, useState } from "react";
import styles from "./Item.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { CartActions } from "../../store/cart";
import useCart from "../../../hook/use-cart";
import { TYPE_ACTIONS } from "../../../util/type-remove-cart";

const Item = ({ imageUrl, name, price, quantity, id, type }) => {
  const dispatch = useDispatch();
  const { removeItemFromCart, isLoading, error, data, addCartHandler } =
    useCart();
  const [typeActions, setTypeActions] = useState(null);
  useEffect(() => {
    if (!error && !isLoading && data) {
      if (typeActions === TYPE_ACTIONS.REMOVE) {
        dispatch(
          CartActions.removeItemInCart({
            id: data.data._id,
          })
        );
      }
      if (typeActions === TYPE_ACTIONS.INCREMENT) {
        dispatch(CartActions.increseItemHandler({ id: id }));
      }
      if (typeActions === TYPE_ACTIONS.DECREMENT) {
        dispatch(CartActions.decreseItemHandler({ id: id }));
      }
    }
  }, [error, isLoading, data, dispatch, typeActions, id]);

  const removeItem = () => {
    setTypeActions(TYPE_ACTIONS.REMOVE);
    removeItemFromCart(id, TYPE_ACTIONS.REMOVE);
  };
  const incrementItemHandler = () => {
    setTypeActions(TYPE_ACTIONS.INCREMENT);
    addCartHandler(1, id);
  };
  const decrementItemHandler = () => {
    setTypeActions(TYPE_ACTIONS.DECREMENT);
    removeItemFromCart(id, TYPE_ACTIONS.DECREMENT);
  };
  return (
    <>
      <div
        className={`${styles.item} d-flex justify-content-between align-items-center`}
      >
        <div className={styles["image__product"]}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={styles["product__content"]}>
          <Link to="/">{name}</Link>
          <p className="fw-bold">Style: {type}</p>
          <p>${price}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div
              className={`${styles["quantity__btn"]} d-flex align-items-center`}
            >
              <div onClick={decrementItemHandler}>-</div>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                readOnly
              />
              <div onClick={incrementItemHandler}>+</div>
            </div>
            <div
              onClick={removeItem}
              className={`${styles.trash} d-flex justify-content-center align-items-center`}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
