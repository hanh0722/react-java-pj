import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: []
}

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        addToWishList(state, action){
            const idWishList = action.payload.productId;
            const cloneWishList = [...state.wishlist];
            const isExisted = cloneWishList.findIndex(item => item.productId === idWishList);
            let newList;
            if(isExisted === -1){
                newList = [...cloneWishList, {quantity: 1, ...action.payload}]
            } else {
                cloneWishList[isExisted].quantity = cloneWishList[isExisted].quantity + 1;
                newList = cloneWishList;
            }
            state.wishlist = newList;
        }
    }
})

export const wishListActions = wishListSlice.actions;

export default wishListSlice;