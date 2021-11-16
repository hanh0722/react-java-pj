import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    index: 0
};

const navigationDashSlice = createSlice({
    name: 'change-nav',
    initialState: initialState,
    reducers: {
        changeNavigation(state, action){
            state.index = action.payload
        }
    }
})

export const navigationActions = navigationDashSlice.actions;
export default navigationDashSlice;
