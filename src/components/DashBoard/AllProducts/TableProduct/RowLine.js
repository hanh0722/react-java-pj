import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import styles from "./TableProduct.module.scss";
import useToggle from "../../../../hook/use-toggle";
import Ripple from "../../../UI/Ripple/Ripple";
import { DASHBOARD, NOT_FOUND } from "../../../link/link";
import { Link } from "react-router-dom";
import useAxios from "../../../../hook/use-axios";
import { removeProductById } from "../../../../config/product/product";
import { useSelector } from "react-redux";
import { SIGN_IN_PAGE } from "../../../link/link";
const RowLine = ({ name, src, inStock, price, id, removeProductHandler }) => {
  const { toggle, changeToggleHandler } = useToggle(false);
  const history = useHistory();
  const { isLoading, data, error, fetchDataFromServer } = useAxios();
  const token = useSelector((state) => state?.isAuth?.token);
  const removeItemHandler = (id) => {
    if (!token) {
      history.replace(SIGN_IN_PAGE);
      return;
    }
    fetchDataFromServer({
      method: 'DELETE',
      url: removeProductById,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: {
        id: id,
      },
    });
  };
  useEffect(() => {
    if (!isLoading && data) {
      removeProductHandler(id);
    }
  }, [isLoading, data, removeProductHandler, id]);
  return (
    <>
    {!isLoading && error && <Redirect to={NOT_FOUND}/>}
      <tr>
        <td className={`d-flex align-items-center`}>
          <img src={src} alt="" />
          <p>{name}</p>
        </td>
        <td>
          <span className={`${styles.status} ${!inStock && styles.out}`}>
            {inStock ? "In Stock" : "Out of products"}
          </span>
        </td>
        <td>{price}$</td>
        <td onClick={changeToggleHandler} className={"position-relative"}>
          <Ripple className={styles.options}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="20"
                height="20"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="12" cy="5" r="2"></circle>
                  <circle cx="12" cy="19" r="2"></circle>
                </g>
              </svg>
            </span>
          </Ripple>
          <ul className={`${styles.list} ${toggle && styles["list-back"]}`}>
            <Link to={`${DASHBOARD}/product?id=${id}&edit=true`}>
              <li>Edit</li>
            </Link>
            <li onClick={removeItemHandler.bind(null, id)}>Delete</li>
          </ul>
        </td>
      </tr>
    </>
  );
};

export default RowLine;
