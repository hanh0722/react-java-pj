import { createSlice } from "@reduxjs/toolkit";

export const TYPE_DISPATCH = {
  TITLE: "TITLE",
  DESCRIPTION: "DESCRIPTION",
  IMAGE: "IMAGE",
  TYPE: "TYPE",
  REGULAR_PRICE: "REGULAR_PRICE",
  SALE_PERCENT: "SALE_PERCENT",
  CHANGE_STOCK: "CHANGE_STOCK",
};
const initialState = {
  title: "",
  description: "",
  image: [],
  type: null,
  regularPrice: null,
  salePercent: 0,
  lastPrice: "",
  inStock: true,
};

const uploadProductSlice = createSlice({
  name: "upload-product",
  initialState: initialState,
  reducers: {
    changeValueOfProduct(state, action) {
      const { type, value } = action.payload;
      switch (type) {
        case TYPE_DISPATCH.TITLE:
          state.title = value;
          break;
        case TYPE_DISPATCH.DESCRIPTION:
          state.description = value;
          break;
        case TYPE_DISPATCH.IMAGE:
          state.image = value;
          break;
        case TYPE_DISPATCH.TYPE:
          state.type = value;
          break;
        case TYPE_DISPATCH.REGULAR_PRICE:
          state.regularPrice = value;
          break;
        case TYPE_DISPATCH.SALE_PERCENT:
          state.salePercent = value;
          break;
        case TYPE_DISPATCH.CHANGE_STOCK:
          state.inStock = value;
          break;
        default:
          return state;
      }
      if (state.salePercent === 0) {
        state.lastPrice = state.regularPrice;
      } else {
        state.lastPrice = (
          +state.regularPrice -
          (+state.regularPrice * +state.salePercent) / 100
        ).toFixed(2);
      }
    },
  },
});

export const uploadActions = uploadProductSlice.actions;
export default uploadProductSlice;
