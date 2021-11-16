import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { Link, useRouteMatch } from "react-router-dom";
import { HOME_PAGE } from "../../../link/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const route = useRouteMatch();
  return (
    <>
      <BreadCrumb>
        <h2>Register</h2>
        <Link to={HOME_PAGE}>
          Home <FontAwesomeIcon icon={faAngleRight} />
        </Link>
        <Link to={route.path}>Register</Link>
      </BreadCrumb>
    </>
  );
};

export default Header;
