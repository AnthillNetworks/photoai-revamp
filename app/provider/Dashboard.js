'use client'
import { createSlice } from "@reduxjs/toolkit";

export const Dashboard = createSlice({
    name: 'Dashboard',
    initialState:{
        Data:[]
    },
    reducers:{
        SetData(state,action){
            state.Data = action.payload
        }
    }
})

export const {SetData} = Dashboard.actions