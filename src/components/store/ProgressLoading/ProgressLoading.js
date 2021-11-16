import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  percent: 0,
  isLoading: false,
};

const progressSlice = createSlice({
  name: "progress-bar",
  initialState: initalState,
  reducers: {
    setStartLoading(state){
      state.isLoading = true;
    },
    setPercentByLoading(state, action) {
      state.percent = action.payload;
    },
    resetPercent(state){
        state.percent = 0;
        state.isLoading = false;
    },
    finishedFetch(state) {
      state.isLoading = false;
    } 
  },
});

export const progressActions = progressSlice.actions;
export default progressSlice;
