import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isClicked: false,
    isShowed: false
}
const hamburgerSlice = createSlice({
    name: 'hamburger',
    initialState,
    reducers: {
        setClickedHandler(state){
            state.isClicked = !state.isClicked;
        },
        searchSlide(state){
            state.isShowed = !state.isShowed;
        }
    }
})

export const hamburgerActions = hamburgerSlice.actions;

export default hamburgerSlice;