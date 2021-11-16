import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const userDataActions = userDataSlice.actions;
export default userDataSlice;
