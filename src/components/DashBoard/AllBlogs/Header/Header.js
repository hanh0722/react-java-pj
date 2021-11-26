import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Input from "../../../input/Input";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DASHBOARD, DASHBOARD_MATERIAL } from "../../../link/link";
import useAxios from "../../../../hook/use-axios";
const Header = () => {
  const { isLoading, fetchDataFromServer, error, data } = useAxios();
  const [keyword, setKeyword] = useState("");

  
  const changeInputHandler = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles.header}`}
    >
      <Input
        className={styles.input}
        input={{
          type: "text",
          placeholder: "Search Posts...",
          onChange: changeInputHandler,
        }}
      />
      <Link to={`${DASHBOARD}${DASHBOARD_MATERIAL.ADMIN[1].path}`}>
        <Button variant="contained" className={styles.button}>
          Create Blog
        </Button>
      </Link>
    </div>
  );
};

export default Header;
