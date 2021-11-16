import React from "react";
import { Link } from "react-router-dom";
import styles from "../Navigation.module.scss";
import { Button } from "@material-ui/core";
import DarkModeBtn from "../../DarkModeBtn/DarkModeBtn";
import { SIGN_IN_PAGE, DASHBOARD_MATERIAL, DASHBOARD, REGISTER_PAGE } from "../../link/link";
const FeatureMobile = ({ isLoggedIn, isClicked, signOutHandler }) => {
  const signOutByUser = () => {
    signOutHandler();
    isClicked();
  }
  return (
    <>
      <div className={styles["signin__btn"]}>
        {!isLoggedIn && (
          <>
            <Link to={SIGN_IN_PAGE}>
              <Button onClick={isClicked} className={`mt-3 mb-3 ${styles.logIn}`} variant="contained">
                Log in
              </Button>
            </Link>
            <Link to={REGISTER_PAGE}>
              <Button onClick={isClicked} className={styles.register} variant="outlined">
                Register
              </Button>
            </Link>
          </>
        )}
        {isLoggedIn && 
        <>
        <Link to={`${DASHBOARD}${DASHBOARD_MATERIAL.GENERAL[0].path}`}>
          <Button onClick={isClicked} className={`${styles.register} mt-3 mb-3`}>Dashboard</Button>
        </Link>
        <Button onClick={signOutByUser} variant="outlined">Sign out</Button>
        </>
        }
      </div>
      <DarkModeBtn className={styles["btn__mb"]} />
    </>
  );
};

export default FeatureMobile;
