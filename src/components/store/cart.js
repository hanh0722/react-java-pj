import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  showCart: false,
  isLoading: false,
  total: 0,
  discount: 0
};
const helperCalculateTotal = (cart, discount) => {
  let total =  cart.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  if(discount){
    total = total - (+discount * total) / 100;
  }
  return Math.round(total * 100) / 100;
}
const helperChangeCart = (cart, isExisted, condition) => {
  const newCart = [...cart];
  newCart[isExisted].quantity = newCart[isExisted].quantity + condition;
  return newCart;
};
const removeItemFromCart = (cart, id) => {
  const newCartAfterRemove = cart.filter((item) => item.id !== id);
  return newCartAfterRemove;
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartHandler(state, action) {
      state.cart = action.payload;
      state.total = helperCalculateTotal(state.cart);
    },
    startLoadingCartHandler(state) {
      state.isLoading = true;
    },
    finishLoadingCartHandler(state) {
      state.isLoading = false;
    },
    addToCartHandler(state, action) {
      const isExisted = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const quantity = action.payload.quantity ? +action.payload.quantity : 1;
      if (isExisted === -1) {
        // not existed in cart
        state.cart = [
          ...state.cart,
          {
            ...action.payload,
            quantity: quantity
          },
        ];
        // add to cart if it doesn't exist
      } else {
        // existed => increase quantity
        const newCart = helperChangeCart(
          state.cart,
          isExisted,
          quantity
        );
        state.cart = newCart;
      }
      state.total = helperCalculateTotal(state.cart, state.discount);
    },
    increseItemHandler(state, action) {
      const isExisted = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const newCart = helperChangeCart(state.cart, isExisted, 1);
      state.cart = newCart;
      state.total = helperCalculateTotal(state.cart, state.discount);
    },
    decreseItemHandler(state, action) {
      const isExisted = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const quantityItem = state.cart[isExisted].quantity;
      let newCart;
      if (quantityItem === 1) {
        newCart = removeItemFromCart(state.cart, action.payload.id);
      } else {
        newCart = helperChangeCart(state.cart, isExisted, -1);
      }
      state.cart = newCart;
      state.total = helperCalculateTotal(state.cart, state.discount);
    },
    removeItemInCart(state, action) {
      const newCart = removeItemFromCart(state.cart, action.payload.id);
      state.cart = newCart;
      state.total = helperCalculateTotal(state.cart, state.discount);
    },
    showCartHandler(state) {
      state.showCart = !state.showCart;
    },
  },
});
export const CartActions = CartSlice.actions;
export default CartSlice;
