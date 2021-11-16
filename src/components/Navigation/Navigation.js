import React, { useState, useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import styles from "./Navigation.module.scss";
import logo from "../../image/logo.png";
import logoDarkTheme from "../../image/logo-dark.png";
import Hamburger from "../hamburger/Hamburger";
import { useDispatch, useSelector } from "react-redux";
import { hamburgerActions } from "../store/hamburgerSlice";
import ReactDOM from "react-dom";
import Overlay from "../overlay/Overlay";
import LayoutList from "../layout/LayoutList";
import Thumb from "../Thumb/Thumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";
import { DarkModeContext } from "../darkmode-context/darkmode-content";
import { CartActions } from "../store/cart";
import Breakpoints from "../Breakpoints/Breakpoints";
import FeatureMobile from "./FeatureMobile/FeatureMobile";
import useMedia from "../../hook/use-media";
import { isAuthActions } from "../store/IsAuth/is-auth";
import { NotifyActions } from "../store/NotifyAfterLogin/NotifyAfterLogin";
import { DASHBOARD_MATERIAL, DASHBOARD, HOME_PAGE } from "../link/link";
const dataToolTip = ["Search", "Account", "WishList", "Cart"];
const Icon = [faSearch, faUser, faHeart, faShoppingCart];
const nestedPath = [
  {
    path: "indoor",
    name: "Indoor Plans",
  },
  { path: "outdoor", name: "Outdoor Plans" },
  { path: "veggies", name: "Herb + Veggies" },
];
const Navigation = ({ isDowned }) => {
  const history = useHistory();
  const DarkModeCtx = useContext(DarkModeContext);
  const [showedUp, setShowedUp] = useState(false);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(hamburgerActions.setClickedHandler());
  };
  const state = useSelector((state) => state.hamburger.isClicked);
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isLoggedIn = useSelector((state) => state.isAuth.isLoggedIn);
  const isOpenSignOutDesktop = useMedia("(min-width: 991px)");
  const setShowedUpHandler = () => {
    setShowedUp((prevState) => {
      return (prevState = !prevState);
    });
  };
  const signOutHandler = () => {
    dispatch(isAuthActions.setIsLoggedOut());
    dispatch(
      NotifyActions.showedNotify({
        message: "Sign out successfully",
        code: 200,
      })
    );
    history.replace(HOME_PAGE);
  };
  return (
    <>
      <nav className={`${isDowned && styles["nav__top"]} ${styles.nav}`}>
        <ul>
          <Hamburger onClick={clickHandler} isClicked={state} />
          <div className={styles.logo}>
            <NavLink activeClassName={styles.active} to="/">
              <li>
                <img src={DarkModeCtx.dark ? logoDarkTheme : logo} alt="logo" />
              </li>
            </NavLink>
          </div>
          <header className={`${styles.items} ${state && styles.back}`}>
            <div
              className={`${styles.child} d-flex justify-content-center align-items-center`}
            >
              <NavLink
                onClick={!isOpenSignOutDesktop ? clickHandler : null}
                to="/"
                activeClassName={styles.active}
                exact
              >
                <li>Home</li>
              </NavLink>
            </div>
            <div
              className={`${styles.child} d-flex justify-content-center align-items-center`}
            >
              <NavLink
                onClick={!isOpenSignOutDesktop ? clickHandler : null}
                to="/shop"
                activeClassName={styles.active}
              >
                <li>Shop</li>
              </NavLink>
            </div>
            <div
              className={`${styles.child} ${styles.row} d-flex justify-content-center align-items-center`}
            >
              <p onClick={setShowedUpHandler} className={`${styles.row}`}>
                <li>Products</li>
                <FontAwesomeIcon icon={faAngleDown} />
              </p>
              <LayoutList isClicked={showedUp} setBack={setShowedUpHandler}>
                <div className={styles["list__inside"]}>
                  {nestedPath.map((items) => {
                    return (
                      <NavLink
                        onClick={!isOpenSignOutDesktop ? clickHandler : null}
                        to={`/products/${items.path}`}
                        key={items.name}
                      >
                        {items.name}
                      </NavLink>
                    );
                  })}
                </div>
              </LayoutList>
            </div>
            <div
              className={`${styles.child} d-flex justify-content-center align-items-center`}
            >
              <NavLink
                onClick={!isOpenSignOutDesktop ? clickHandler : null}
                to="/blogs"
                activeClassName={styles.active}
              >
                <li>Blogs</li>
              </NavLink>
            </div>
            {!isOpenSignOutDesktop && (
              <FeatureMobile
                signOutHandler={signOutHandler}
                isLoggedIn={isLoggedIn}
                isClicked={!isOpenSignOutDesktop ? clickHandler : null}
              />
            )}
          </header>
          <div className={styles.icons}>
            {Icon.map((items, index) => {
              if (index === 0) {
                return (
                  <li
                    onClick={() => dispatch(hamburgerActions.searchSlide())}
                    key={index}
                  >
                    <FontAwesomeIcon icon={items} />
                    <Thumb className={styles.tooltip}>Search</Thumb>
                  </li>
                );
              }
              if (index === 2) {
                return (
                  <li key={index}>
                    <FontAwesomeIcon icon={items} />
                    <Thumb className={styles.tooltip}>
                      {dataToolTip[index]}
                    </Thumb>
                    {wishlist.length > 0 && (
                      <Breakpoints>
                        {wishlist.reduce((acc, item) => {
                          return acc + item.quantity;
                        }, 0)}
                      </Breakpoints>
                    )}
                  </li>
                );
              }
              if (index === 3) {
                return (
                  <li
                    onClick={() => dispatch(CartActions.showCartHandler())}
                    key={index}
                  >
                    <FontAwesomeIcon icon={items} />
                    <Thumb className={styles.tooltip}>
                      {dataToolTip[index]}
                    </Thumb>
                    {cart.length > 0 && (
                      <Breakpoints>
                        {cart.reduce((acc, item) => {
                          return acc + item.quantity;
                        }, 0)}
                      </Breakpoints>
                    )}
                  </li>
                );
              }
              return (
                <li key={index}>
                  <Link
                    to={`${DASHBOARD}${DASHBOARD_MATERIAL.GENERAL[0].path}`}
                  >
                    <FontAwesomeIcon icon={items} />
                  </Link>
                  <Thumb className={styles.tooltip}>{dataToolTip[index]}</Thumb>
                </li>
              );
            })}
            <DarkModeBtn className={styles["btn__main"]} />
            {isLoggedIn && isOpenSignOutDesktop && (
              <li onClick={signOutHandler}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="sign-out-alt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-sign-out-alt fa-w-16 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"
                    className=""
                  ></path>
                </svg>
                <Thumb className={`${styles.tooltip} ${styles.signout}`}>
                  Sign out
                </Thumb>
              </li>
            )}
          </div>
        </ul>
      </nav>
      {state &&
        ReactDOM.createPortal(
          <Overlay
            onClick={() => dispatch(hamburgerActions.setClickedHandler())}
          />,
          document.getElementById("bg__ol")
        )}
    </>
  );
};

export default Navigation;
