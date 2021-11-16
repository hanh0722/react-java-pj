import { createSlice } from "@reduxjs/toolkit";

const inforSignUpSlice = createSlice({
    name: 'create-signup',
    initialState: {
        name: '',
        email: '',
        password: '',
        phone: ''
    },
    reducers: {
        changeInforHandler(state, action){
            const {field, value} = action.payload;
            state.field = value;
        }
    }
})