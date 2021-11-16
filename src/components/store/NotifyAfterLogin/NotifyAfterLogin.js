import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showed: false,
    message: '',
    code: 200
}

const NotifySlice = createSlice({
    name: 'notify',
    initialState: initialState,
    reducers: {
        showedNotify(state, action){
            state.showed = true;
            state.message = action.payload.message || '';
            state.code = action.payload.code || 500;
        },
        removeNotify(state){
            state.showed = false;
        },
        removeMessageAndCode(state){
            state.message = '';
            state.code = 200;
        }
    }
})

export const NotifyActions = NotifySlice.actions;
export default NotifySlice;