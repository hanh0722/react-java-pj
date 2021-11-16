import React from "react";
import styles from "./CategorySelect.module.scss";
import Transition from "../../Transition/Transition";
const CategorySelect = ({ children, className, isShowed }) => {
  return (
    <>
      <Transition
        options={{
          in: isShowed,
          timeout: 750,
          classNames: "scale",
          unmountOnExit: true,
          mountOnEnter: true,
        }}
      >
        <ul
          className={`${styles.list} ${className} ${
            isShowed && styles["back-list"]
          }`}
        >
          {children}
        </ul>
      </Transition>
    </>
  );
};

export default CategorySelect;
