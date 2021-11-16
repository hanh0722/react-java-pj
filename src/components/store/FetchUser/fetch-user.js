import { createSlice } from "@reduxjs/toolkit";
import { getUserByToken } from "../../../config/url";
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  status: 200,
};

const fetchUserSlice = createSlice({
  name: "fetch-user",
  initialState: initialState,
  reducers: {
    getUserHandler(state, action) {
        console.log(action.payload);
    },
  },
});

export const getUserThunk = async () => {
    const token = localStorage.getItem('token')
    return async (dispatch) => {
        const response = await fetch(getUserByToken())
    }
}

export const fetchUserActions = fetchUserSlice.actions;
export default fetchUserSlice;

