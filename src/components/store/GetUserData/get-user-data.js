import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserByEmail } from "../../../config/user/user";
const initialState = {
    user: null,
    isLoading: false
}

const userDataSlice = createSlice({
    name: 'user-data',
    initialState: initialState,
    reducers: {
        getUserFromServer(state, action){
            state.user = action.payload;
            state.isLoading = false;
        },
        isLoadingFetch(state){
            state.isLoading = true;
        },
        finishedLoading(state){
            state.isLoading = false;
        },
        removeUserPersist(state) {
            state.user = null;
            state.isLoading = false;
        }
    }
})

export const userDataActions = userDataSlice.actions;
export const getUserDataHandler = (userEmail, token) => {
    if(!userEmail){
        return;
    }
    return async (dispatch) => {
        dispatch(userDataActions.isLoadingFetch());
        const user = await axios({
            url: getUserByEmail(userEmail),
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });
        dispatch(userDataActions.finishedLoading());
        if(!user){
            return;
        }
        dispatch(userDataActions.getUserFromServer(user.data));
    }
}
export default userDataSlice;
