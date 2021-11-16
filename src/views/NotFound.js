import React from "react";
import styles from "../components/NotFound/NotFound.module.scss";
import Container from "../components/layout/container/Container";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HOME_PAGE } from "../components/link/link";
const NotFound = () => {
  return (
    <>
      <Container>
        <div className={styles.page}>
        <h4>404</h4>
          <div className={`${styles.banner} text-center`}>
          </div>
          <div className={`${styles.content} text-center`}>
            <p>Oops! The url you're looking for not being existed</p>
            <p>Maybe URL is removed or wrong</p>
            <Link to={HOME_PAGE}>
              <Button>Go To Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
