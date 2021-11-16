import React, { useState } from "react";
import styles from "./ChooseItemPerpage.module.scss";
import { useHistory } from "react-router-dom";
const ChooseItemPerpage = ({ defaultColumn, setColumnPerPage }) => {
  const [column, setColumn] = useState(defaultColumn || 8);
  const history = useHistory();
  const changeColumnHandler = (column) => {
    setColumn(column);
    if (setColumnPerPage) {
      setColumnPerPage(column);
    }
    history.push('?page=1');
  };
  return (
    <div className={`${styles.container}`}>
      <div className={`d-flex justify-content-end align-items-center`}>
        <span onClick={changeColumnHandler.bind(null, 4)} className={column === 4 ? styles.active : ""}>
          <svg
            width="12px"
            height="12px"
            className="w-[12px] h-[12px]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 5.5 12.5"
          >
            <defs></defs>
            <defs>
              <style>.cls-1{`fill-rule:evenodd`}</style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="shop_page" data-name="shop page">
                  <g id="Group-10">
                    <path
                      id="Rectangle"
                      d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                      className="cls-1"
                    ></path>
                    <path
                      id="Rectangle-2"
                      d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                      className="cls-1"
                      data-name="Rectangle"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <span onClick={changeColumnHandler.bind(null, 6)} className={column === 6 ? styles.active : ""}>
          <svg
            width="12px"
            height="12px"
            className="w-[12px] h-[12px]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9.5 12.5"
          >
            <defs></defs>
            <defs>
              <style>.cls-1{`fill-rule:evenodd`}</style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="shop_page" data-name="shop page">
                  <g id="Group-16">
                    <path
                      id="Rectangle"
                      d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                      className="cls-1"
                    ></path>
                    <path
                      id="Rectangle-2"
                      d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                      className="cls-1"
                      data-name="Rectangle"
                    ></path>
                    <path
                      id="Rectangle-3"
                      d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z"
                      className="cls-1"
                      data-name="Rectangle"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <span onClick={changeColumnHandler.bind(null, 8)} className={column === 8 ? styles.active : ""}>
          <svg
            width="12px"
            height="12px"
            className="w-[12px] h-[12px]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13.5 12.5"
          >
            <defs></defs>
            <defs>
              <style>.cls-1{`fill-rule:evenodd`}</style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="shop_page" data-name="shop page">
                  <g id="_4_col" data-name="4_col">
                    <path
                      id="Rectangle"
                      d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                      className="cls-1"
                    ></path>
                    <path
                      id="Rectangle-2"
                      d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                      className="cls-1"
                      data-name="Rectangle"
                    ></path>
                    <path
                      id="Rectangle-3"
                      d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z"
                      className="cls-1"
                      data-name="Rectangle"
                    ></path>
                    <path
                      id="Rectangle-4"
                      d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z"
                      className="cls-1"
                      data-name="Rectangle"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ChooseItemPerpage;
