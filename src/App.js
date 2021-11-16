import React, { useCallback, useEffect, useState } from "react";
import RoutesConfig from "./routes/routes";
import Navigation from "./components/Navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CartMain from "./components/CartMain/CartMain";
import "./components/styles/styles.scss";
import ButtonTop from "./components/ButtonTop/ButtonTop";
import { buttonTopActions } from "./components/store/button-top";
import Footer from "./components/Footer/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import LayoutTop from "./components/layout/LayoutTop/LayoutTop";
import MessageSideBar from "./components/MessageSideBar/MessageSideBar";
import ProgressLoading from "./components/ProgressLoading/ProgressLoading";
import { checkUserIsAuth } from "./components/store/IsAuth/is-auth";
const App = () => {
  const [navigation, setNavigation] = useState(false);
  const location = useLocation();
  const state = useSelector((state) => state.hamburger.isShowed);
  const dispatch = useDispatch();
  const getScrollHandler = useCallback(() => {
    let newValue;
    let oldValue;
    newValue = window.scrollY;
    // bug in navigation
    if (newValue > 50) {
      dispatch(buttonTopActions.setVisibleHandler());
    } else {
      dispatch(buttonTopActions.setHiddenHandler());
    }
    if (oldValue < newValue && newValue > 50) {
      setNavigation(true);
    } else {
      setNavigation(false);
    }
    oldValue = newValue;
  }, [dispatch]);
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1200,
      offset: 250,
      delay: 600,
    });
    window.addEventListener("scroll", getScrollHandler);
    dispatch(checkUserIsAuth());
  }, [dispatch, getScrollHandler]);
  useEffect(() => {
    upToTopHandler();
  }, [location.pathname]);
  const upToTopHandler = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <ProgressLoading />
      <MessageSideBar />
      <Navigation isDowned={navigation} />
      <SearchBar isShowed={state} />
      <ButtonTop onClick={upToTopHandler} />
      <CartMain />
      <LayoutTop>
        <RoutesConfig />
        <Footer />
      </LayoutTop>
    </>
  );
};

export default App;
