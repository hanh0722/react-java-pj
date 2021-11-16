import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNearTop: false
}

const buttonSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        setHiddenHandler(state){
            state.isNearTop = false;
        },
        setVisibleHandler(state){
            state.isNearTop = true;
        }
    }
})

export const buttonTopActions = buttonSlice.actions;
export default buttonSlice;