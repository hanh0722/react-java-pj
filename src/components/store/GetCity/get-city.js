import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    country: null
};

const citySlice = createSlice({
    name: 'city-slice',
    initialState,
    reducers: {
        changeCountry(state, action){
            state.country = action.payload;
        }
    }
})

export const cityActions = citySlice.actions;
export default citySlice;