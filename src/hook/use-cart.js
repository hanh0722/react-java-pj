import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "./use-axios";
import {
  addToCartById,
  removeItemWithId,
  decreasementItemInCart,
} from "../config/cart";
import { useHistory } from "react-router";
import { SIGN_IN_PAGE } from "../components/link/link";
import { NotifyActions } from "../components/store/NotifyAfterLogin/NotifyAfterLogin";
import { TYPE_ACTIONS } from "../util/type-remove-cart";
const useCart = () => {
  const isLoggedIn = useSelector((state) => state.isAuth.isLoggedIn);
  const token = useSelector((state) => state.isAuth.token);
  const { isLoading, data, error, fetchDataFromServer } = useAxios();
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectUserToSign = () => {
    dispatch(
      NotifyActions.showedNotify({
        message: "Sign in to continue",
        code: 401,
      })
    );
    history.replace(SIGN_IN_PAGE);
  };
  useEffect(() => {
    if (!isLoading && error) {
      dispatch(
        NotifyActions.showedNotify({
          message: error.message || "Something went wrong, please try again",
          code: error.code || 500,
        })
      );
      return;
    }
    // add to cart when not having error
  }, [isLoading, error, dispatch]);
  const addCartHandler = (value, productId) => {
    if (!isLoggedIn || !token) {
      redirectUserToSign();
      return;
    }
    // user must be verified before adding to cart, otherwise, back to sign in
    fetchDataFromServer({
      method: "PUT",
      url: addToCartById(productId),
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        value: value || 1,
      },
    });
    // actually, we can dispatch to add FE cart in here but if server is error or something?, return error
    // it's still dispatch and add data inside but actually, cart of user in server BE is still empty
    // dispatch(CartActions.showCartHandler());
    // dispatch(CartActions.addToCartHandler(product));
  };
  const removeItemFromCart = (productId, type_action) => {
    if (!token || !isLoggedIn) {
      redirectUserToSign();
      return;
    }
    fetchDataFromServer({
      method: type_action === TYPE_ACTIONS.REMOVE ? "DELETE" : "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      url:
        type_action === TYPE_ACTIONS.REMOVE
          ? removeItemWithId
          : decreasementItemInCart,
      data: {
        id: productId,
      },
    });
  };

  return {
    isLoading,
    data,
    error,
    addCartHandler,
    removeItemFromCart,
  };
};

export default useCart;
