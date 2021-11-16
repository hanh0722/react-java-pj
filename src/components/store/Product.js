import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idProduct: null,
    showModel: false
}
const ProductSlice = createSlice({
    name: 'product_id',
    initialState,
    reducers: {
        setIdProduct(state, action){
            state.idProduct = action.payload;
        },
        removeProduct(state){
            state.idProduct = null
        },
        setShowModalHandler(state){
            state.showModel = !state.showModel
        }
    }
})

export const ProductActions = ProductSlice.actions;

export default ProductSlice;