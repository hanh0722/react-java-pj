import { createContext, useEffect, useState, useCallback } from "react";
export const IsAuthContext = createContext({
  isAuth: false,
  logOutHandler: () => {},
});

const IsAuthProvider = (props) => {
  const removeStorageHandler = useCallback(() => {
    localStorage.removeItem("token/customer");
    localStorage.removeItem("expiry/customer");
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token/customer");
    const timeExpire = localStorage.getItem("expiry/customer");
    if (!token || !timeExpire) {
      setIsLoggedIn(false);
      return;
    }
    const dateNow = Date.now();
    if (dateNow > timeExpire) {
      setIsLoggedIn(false);
      removeStorageHandler();
      return;
    }
    const timeExpirationAfterWhile = timeExpire - dateNow;
    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      removeStorageHandler();
    }, timeExpirationAfterWhile);
  }, [removeStorageHandler]);
  const logOutFromUserHandler = () => {
    removeStorageHandler();
    setIsLoggedIn(false);
  };
  return (
    <IsAuthContext.Provider
      value={{ isAuth: isLoggedIn, logOutHandler: logOutFromUserHandler }}
    >
      {props.children}
    </IsAuthContext.Provider>
  );
};

export default IsAuthProvider;