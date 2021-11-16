import React, { forwardRef } from "react";
import styles from "./BoxInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { CSSTransition } from "react-transition-group";
const BoxInput = forwardRef((props, ref) => {
  return (
    <div className={styles.box}>
      <CSSTransition classNames={'scale'} in={props.isCopied} unmountOnExit mountOnEnter>
        <p className={`${styles.title} mb-3`}>You copied the link!</p>
      </CSSTransition>
      <div className="d-flex justify-content-between align-items-center flex-row-reverse pb-3">
        <div
          onClick={props.onClick}
          className={`${styles.close} d-flex justify-content-center align-items-center`}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <p>Copy Link</p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <input {...props.input} ref={ref} />
        <div
          onClick={props.copyBoard}
          className={`${styles.copy} d-flex justify-content-center align-items-center`}
        >
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </div>
    </div>
  );
});

export default BoxInput;
