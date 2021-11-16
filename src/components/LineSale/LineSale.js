import React from "react";
import Circle from "./Circle/Circle";
import styles from "./LineSale.module.scss";
import { Link } from "react-router-dom";
const LineSale = ({number, name, price, imageUrl}) => {
  return (
    <div className={`${styles.items}`}>
      <Circle className={styles.circle}>{number}</Circle>
      <div className={`${styles.product} d-flex justify-content-between align-items-center`}>
        <div className={styles.image}>
          <img src={imageUrl} alt={name} />
        </div>
        <div className={`${styles["line__content"]}`}>
          <p>
            <Link to="/">{name}</Link>
          </p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default LineSale;
