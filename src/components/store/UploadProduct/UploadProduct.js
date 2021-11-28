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

const helperCalculate = (salePercent, regularPrice) => {
  if (salePercent === 0) {
    return regularPrice;
  }
  return (+regularPrice - (+regularPrice * +salePercent) / 100).toFixed(2);
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
      state.lastPrice = helperCalculate(state.salePercent, state.regularPrice);
    },
    setValueProduct(state, action) {
      state.title = action.payload.title || '';
      state.description = action.payload.description || '';
      state.image = action.payload.imageUrls || [];
      state.inStock = action.payload.inStock || true;
      state.type = action.payload.category || null;
      state.regularPrice = action.payload.regularPrice || null;
      state.salePercent = action.payload.salePercent || 0;
      state.lastPrice = action.payload.lastPrice || helperCalculate(state.salePercent, state.regularPrice);
    },
  },
});

export const uploadActions = uploadProductSlice.actions;
export default uploadProductSlice;
