import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: false
}

const styleDetailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        getIntroduction(state, action){
            state.content = false;
        },
        getShippingAndReturn(state){
            state.content = true;
        }
    }
})

export const styleDetailActions = styleDetailSlice.actions;

export default styleDetailSlice;