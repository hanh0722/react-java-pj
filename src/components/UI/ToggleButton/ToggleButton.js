import React from "react";
import styles from "./ToggleButton.module.scss";
import Ripple from "../Ripple/Ripple";
const ToggleButton = ({ isClicked, onClicked, className }) => {
  return (
    <div
      className={`${styles["tg-container"]} ${isClicked && styles["clicked"]} ${className}`}
    >
      <Ripple>
        <span onClick={onClicked} />
      </Ripple>
    </div>
  );
};

export default ToggleButton;
