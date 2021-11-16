import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavData from "./NavData/NavData";
import { navigationActions } from "../../store/NavigationDash/navigation-dash";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import nonAccentVietnamese from "../../removeUnicode/removeUnicode";
const Navigation = ({ navIndex }) => {
  const [position, setPosition] = useState(null);
  const getIndex = useSelector((state) => state.nav.index);
  const dispatch = useDispatch();
  const changeNavHandler = (event, index) => {
    dispatch(navigationActions.changeNavigation(index));
  };
  useEffect(() => {
    const element = document.querySelector([`[data-index="${getIndex}"]`]);
    const position = element.getBoundingClientRect();
    setPosition(position);
  }, [getIndex]);
  return (
    <nav className={styles.navigation}>
      <ul className={`d-flex align-items-center ${styles.nav}`}>
        {NavData.map((item, index) => {
          return (
            <Link key={index} to={`?option=${nonAccentVietnamese(item.name)}`}>
              <li
                data-index={index}
                onClick={(event) => changeNavHandler(event, index)}
                key={index}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.name}
              </li>
            </Link>
          );
        })}
        {position && (
          <span
            style={{
              width: position.width,
              left: position.left,
              bottom: position.bottom,
              right: position.right,
              top: position.top + position.height,
            }}
            className={styles.line}
          ></span>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
