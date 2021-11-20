import { createSlice } from "@reduxjs/toolkit";
import { CartActions } from "../cart";
const initialState = {
  isLoggedIn: !!localStorage.getItem('token/customer') ? true : false,
  // check if user has token or not, if we dont have token, initialstate must be false
  // if we have token => must be true => persist token
  expired: false,
  token: localStorage.getItem('token/customer') || null,
  emailUser: localStorage.getItem('tracking/user') || null
};

const removeStorageHandler = () => {
  localStorage.removeItem("token/customer");
  localStorage.removeItem("expiry/customer");
  localStorage.removeItem('tracking/user');
};
const isAuthSlice = createSlice({
  name: "is-auth",
  initialState: initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isLoggedIn = true;
      state.expired = false;
      state.token = action.payload.token;
      state.emailUser = action.payload.emailUser;
    },
    setIsLoggedOut(state) {
      state.isLoggedIn = false;
      state.expired = false;
      state.token = null;
      state.emailUser = null;
      removeStorageHandler();
    },
    setExpired(state) {
      state.expired = true;
    },
  },
});

export const checkUserIsAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token/customer");
    const expiryTime = localStorage.getItem("expiry/customer");
    const trackingEmail = localStorage.getItem('tracking/user');
    if (!token || !expiryTime || !trackingEmail) {
      dispatch(isAuthActions.setIsLoggedOut());
      dispatch(CartActions.resetCartHandler());
      return;
    }
    const dateNow = Date.now();
    if (expiryTime < dateNow) {
      dispatch(isAuthActions.setIsLoggedOut());
      dispatch(isAuthActions.setExpired());
      removeStorageHandler();
      return;
    } else {
      dispatch(isAuthActions.setIsAuthenticated({
        token: token,
        emailUser: trackingEmail
      }));
    }
    const timeLeft = expiryTime - dateNow;
    setTimeout(() => {
      dispatch(isAuthActions.setIsLoggedOut());
      dispatch(isAuthActions.setExpired());
      removeStorageHandler();
    }, timeLeft);
  };
};

export const isAuthActions = isAuthSlice.actions;
export default isAuthSlice;
