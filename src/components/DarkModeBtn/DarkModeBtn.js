import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import styles from "./DarkModeBtn.module.scss";
import { DarkModeContext } from "../darkmode-context/darkmode-content";
const DarkModeBtn = (props) => {
  const DarkModeCtx = useContext(DarkModeContext);
  return (
    <li  className={`d-flex align-items-center ${props.className}`}>
      <div className={styles.button}>
        <div onClick={DarkModeCtx.setThemeHandler} className={`${styles["toggle__btn"]} ${DarkModeCtx.dark && styles['dark__theme']}`}>
        </div>
        <span className={`${styles.icon} ${DarkModeCtx.dark && styles['icon__dark']}`}><FontAwesomeIcon icon={DarkModeCtx.dark ? faMoon : faSun} /></span>
      </div>
    </li>
  );
};

export default DarkModeBtn;
