import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styles from "./Header.module.scss";
const Header = ({ title, url, button, className }) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles.header} ${className}`}
    >
      <h4>{title}</h4>
      <Link to={url}>
        <Button variant="contained">{button}</Button>
      </Link>
    </div>
  );
};

export default Header;
