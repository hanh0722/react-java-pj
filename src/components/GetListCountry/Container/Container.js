import React from "react";
import styles from "../GetCityByCountry/GetCityByCountry.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "../../UI/LoadingSkeleton/Skeleton";
import Transition from "../../Transition/Transition";
const Container = ({
  isLoading,
  error,
  title,
  icon,
  children,
  value,
  transitionConfig,
  onClick,
  toggle,
  initialValue,
}) => {
  return (
    <div className={styles.list}>
      <p onClick={onClick} className={styles.title}>
        {title}
      </p>
      <div onClick={onClick} className={`${styles.box}`}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <span>{value ? value : initialValue ? initialValue : "City"}</span>
      </div>

      <Transition
        options={
          transitionConfig
            ? { ...transitionConfig, in: toggle }
            : {
                in: toggle,
                classNames: "scale",
                timeout: 750,
                mountOnEnter: true,
                unmountOnExit: true,
              }
        }
      >
        <ul>
          {isLoading && <Skeleton times={18} />}
          {children}
          {!isLoading && error && (
            <li className="text-center">Cannot get data</li>
          )}
        </ul>
      </Transition>
    </div>
  );
};

export default Container;
