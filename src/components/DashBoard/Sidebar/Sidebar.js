import React, { useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.scss";
import { NavLink, Redirect } from "react-router-dom";
import { DASHBOARD_MATERIAL, NOT_FOUND, SIGN_IN_PAGE } from "../../link/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../image/logo.png";
import logoDark from "../../../image/logo-dark.png";
import useToggle from "../../../hook/use-toggle";
import { DarkModeContext } from "../../darkmode-context/darkmode-content";
import User from "../User/User";
import ReactDOM from "react-dom";
import Overlay from "../../overlay/Overlay";
import Transition from "../../Transition/Transition";
import { DASHBOARD } from "../../link/link";
import Ripple from "../../UI/Ripple/Ripple";
import { checkUserIsAuth } from "../../store/IsAuth/is-auth";
import useFetch from "../../../hook/use-fetch";
import { getUserApi } from "../../../config/url";
import { userDataActions } from "../../store/GetUserData/get-user-data";
const SideBar = () => {
  const { dark } = useContext(DarkModeContext);
  const { toggle, changeToggleHandler } = useToggle(false);
  const { toggle: toggleNavigation, changeToggleHandler: setToggleHandler } =
    useToggle(false);
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.isAuth);
  const { getDataFromServerHandler, data, error, isLoading, resetAllHandler } =
    useFetch();
  // don't put useEffect check in container => it'll render everytime user move to other page, not good for data so far
  useEffect(() => {
    dispatch(checkUserIsAuth());
  }, [dispatch]);
  const getUserFromServer = useCallback(() => {
    getDataFromServerHandler({
      url: getUserApi,
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }, [getDataFromServerHandler, token]);
  useEffect(() => {
    if (!token) {
      return;
    }
    getUserFromServer();
    return () => {
      resetAllHandler();
    };
  }, [getUserFromServer, token, resetAllHandler]);
  useEffect(() => {
    if (isLoading) {
      dispatch(userDataActions.isLoadingFetch());
    } else {
      if (!data || error) {
        dispatch(userDataActions.finishedLoading());
        return;
      }
      dispatch(userDataActions.getUserFromServer(data));
    }
  }, [isLoading, data, error, dispatch]);
  const renderListPath = (array) => {
    const mapPath = array.map((item) => {
      return (
        <Ripple key={item.name}>
          <NavLink
            activeClassName={styles.active}
            to={`${DASHBOARD}${item.path}`}
          >
            <li
              className={`${styles["list--item"]} d-flex align-items-center`}
              key={item.path}
            >
              <span className={styles.icon}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <div className={styles.name}>
                <span>{item.name}</span>
              </div>
            </li>
          </NavLink>
        </Ripple>
      );
    });
    return mapPath;
  };
  return (
    <>
      {!isLoggedIn && !token && <Redirect to={SIGN_IN_PAGE} />}
      {!isLoading && error && <Redirect to={NOT_FOUND} />}
      <div
        className={`${styles["side--bar"]} ${
          toggle && styles["close--sidebar"]
        } ${toggleNavigation && styles["change--sidebar"]}`}
      >
        <div
          className={`${styles["intro--box"]} d-flex justify-content-between align-items-center`}
        >
          <div className={styles.logo}>
            <img src={dark ? logoDark : logo} alt="" />
          </div>
          <Ripple className="rounded-circle">
            <div
              onClick={changeToggleHandler}
              type="button"
              className={styles["btn--open"]}
            >
              <span></span>
            </div>
          </Ripple>
        </div>
        <User isLoading={isLoading} data={data} toggle={toggle} />
        <div className={styles.list}>
          <ul>
            <li>General</li>
            {renderListPath(DASHBOARD_MATERIAL.GENERAL)}
          </ul>
          <ul>
            <li>E-Commerce</li>
            {renderListPath(DASHBOARD_MATERIAL.ECOMMERCE)}
          </ul>
          {!isLoading && data && data.user.admin && (
            <ul>
              <li>Admin</li>
              {renderListPath(DASHBOARD_MATERIAL.ADMIN)}
            </ul>
          )}
        </div>
      </div>
      <div onClick={setToggleHandler} className={styles.options}>
        <FontAwesomeIcon icon={faSlidersH} />
      </div>

      <Transition
        options={{
          in: toggleNavigation,
          mountOnEnter: true,
          unmountOnExit: true,
          timeout: 750,
        }}
      >
        <>
          {ReactDOM.createPortal(
            <Overlay onClick={setToggleHandler} style={{ zIndex: "20" }} />,
            document.getElementById("bg__ol")
          )}
        </>
      </Transition>
    </>
  );
};

export default React.memo(SideBar);
