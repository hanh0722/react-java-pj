import React, { useEffect } from "react";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../hook/use-axios";
import { postCountryByName } from "../../../config/url";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import useToggle from "../../../hook/use-toggle";
const GetCityByCountry = ({ setCity, city }) => {
  const { fetchDataFromServer, data, isLoading, error, stopLoading } = useAxios();
  const country = useSelector((state) => state.city.country);
  const { toggle, changeToggleHandler } = useToggle(false);
  useEffect(() => {
    if (!country) {
      return;
    }
    fetchDataFromServer({
      url: postCountryByName,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        country: country,
      },
    });
    return () => {
      stopLoading();
    }
  }, [country, fetchDataFromServer, stopLoading]);
  const setStateToState = (state) => {
    changeToggleHandler();
    setCity({
      city: state.name,
      code: state.state_code
    })
  };
  return (
    <Container
      onClick={changeToggleHandler}
      toggle={toggle}
      isLoading={isLoading}
      error={error}
      value={city?.city && city?.code && `${city?.city} - ${city?.code}`}
      title="City"
      icon={faCity}
    >
      {(!data && !city) && (
        <li
          className={`text-center h-100 d-flex justify-content-center align-items-center error__text`}
        >
          Please choose country first!
        </li>
      )}
      {data?.data?.data?.states?.map((state) => {
        return (
          <li onClick={() => setStateToState(state)} key={state.name}>
            {state.name} - {state.state_code}
          </li>
        );
      })}
    </Container>
  );
};

export default GetCityByCountry;
