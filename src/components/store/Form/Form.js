import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email : '',
    phone: '',
    note: ''
}
const formSlice = createSlice({
    name: 'user-information',
    initialState: initialState,
    reducers: {
        changeUserHandler(state, action){

        }
    }
})