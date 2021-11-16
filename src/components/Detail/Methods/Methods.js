import React from "react";
import styles from "../../styles/DetailItem.module.scss";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Methods = ({ setContent, setChangeLayout }) => {
  return (
    <div className={`${styles.function} ${styles.space} d-flex align-items-center`}>
      <div
        onClick={() => {
          setContent("ask");
          setChangeLayout(true);
        }}
      >
        <span>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
        Ask a question
      </div>
      <div
        onClick={() => {
          setContent("share");
          setChangeLayout(true);
        }}
      >
        <span>
          <FontAwesomeIcon icon={faShareAlt} />
        </span>
        Share
      </div>
    </div>
  );
};

export default Methods;
