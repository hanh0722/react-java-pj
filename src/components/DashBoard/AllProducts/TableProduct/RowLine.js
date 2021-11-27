import React from "react";
import styles from "./TableProduct.module.scss";
import useToggle from "../../../../hook/use-toggle";
import Ripple from "../../../UI/Ripple/Ripple";
import { DASHBOARD } from "../../../link/link";
import { Link } from "react-router-dom";
const RowLine = ({name, src, inStock, price, id}) => {
  const { toggle, changeToggleHandler } = useToggle(false);
  return (
    <tr>
      <td className={`d-flex align-items-center`}>
        <img src={src} alt="" />
        <p>{name}</p>
      </td>
      <td>
        <span className={styles.status}>{inStock ? "In Stock" : "Out of products"}</span>
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
          <Link to={`${DASHBOARD}/product/${id}?edit=true`}>
            <li>Edit</li>
          </Link>
          <li>Delete</li>
        </ul>
      </td>
    </tr>
  );
};

export default RowLine;
