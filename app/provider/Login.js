'use client'
import { createSlice } from "@reduxjs/toolkit";

export const Login = createSlice({
    name: 'Login',
    initialState:{
        Is_Login:false,
        Is_SuperAdmin:false,
        EventName:''
    },
    reducers:{
        set_is_login(state,action){
            state.Is_Login = action.payload
        },
        set_is_super_admin(state,action){
            state.Is_SuperAdmin = action.payload
        },
        set_event_name(state,action){
            state.EventName = action.payload
        }
    }
})

export const {Set_is_Login,set_is_super_admin,set_event_name} = Login.actions