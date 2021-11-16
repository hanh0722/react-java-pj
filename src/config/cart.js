import { serverUrl } from "./url";

const api = `${serverUrl}/api/cart`;

const addToCartById = (id) => {
  return `${api}/add/${id}`;
};
const addToCartWithParams = `${api}/add`;
const getCartOfUser = `${api}/user`;
const removeItemWithId = `${api}/delete`;
const decreasementItemInCart = `${api}/remove`;
export {
  addToCartById,
  addToCartWithParams,
  getCartOfUser,
  removeItemWithId,
  decreasementItemInCart,
};
