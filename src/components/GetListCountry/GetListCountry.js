import React, { useEffect, useState } from "react";
import useAxios from "../../hook/use-axios";
import styles from "./GetListCountry.module.scss";
import { getCountryApi } from "../../config/url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "../UI/LoadingSkeleton/Skeleton";
import useToggle from "../../hook/use-toggle";
import Transition from "../Transition/Transition";

const GetListCountry = ({getCityHandler, setCountry: setCountryHandler, initialCountry}) => {
  const { isLoading, error, data, fetchDataFromServer, stopLoading } =
    useAxios();
  const { toggle, changeToggleHandler } = useToggle(false);
  const [country, setCountry] = useState(initialCountry);
  useEffect(() => {
    fetchDataFromServer({
      url: getCountryApi,
    });
    return () => {
      stopLoading();
    };
  }, [fetchDataFromServer, stopLoading]);
  useEffect(() => {
    if(initialCountry){
      getCityHandler(initialCountry.country);
    }
  }, [initialCountry, getCityHandler]);
  const setCountryToInput = (country) => {
    setCountry(country);
    if(setCountryHandler){
      setCountryHandler(country);
    }
    if(getCityHandler){
      getCityHandler(country.country);
    }
    changeToggleHandler();
  };
  return (
    <div className={styles.list}>
      <p onClick={changeToggleHandler} className={styles.title}>Country</p>
      <div
        onClick={changeToggleHandler}
        className={`d-flex justify-content-between align-items-center ${styles.select}`}
      >
        <span className={styles["name-country"]}>
          {country.country ? country.country : "Choose Country"}
        </span>
        {country && (
          <span>
            <img src={country.flag} alt="" />
          </span>
        )}
        {!country && <FontAwesomeIcon icon={faChevronDown} />}
      </div>

      <Transition
        options={{
          in: toggle,
          timeout: 750,
          classNames: "scale",
          mountOnEnter: true,
          unmountOnExit: true,
        }}
      >
        <ul>
          {isLoading && <Skeleton times={8} />}
          {!isLoading &&
            data &&
            data?.data?.data?.map((country) => {
              return (
                <li
                  onClick={() =>
                    setCountryToInput({
                      country: country.name,
                      flag: country.flag,
                    })
                  }
                  className={`${styles.country} d-flex align-items-center`}
                  key={country.name}
                >
                  <img src={country.flag} alt={""} />
                  <span>{country.name}</span>
                </li>
              );
            })}
          {!isLoading && error && (
            <li className={`${styles.error} text-center`}>
              Please try again, cannot get data
            </li>
          )}
        </ul>
      </Transition>
    </div>
  );
};

export default GetListCountry;
