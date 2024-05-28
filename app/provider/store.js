'use client'
import { configureStore } from "@reduxjs/toolkit";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";

export const store = configureStore({
    reducer:{
        'Dashboard': Dashboard.reducer,
        'Login': Login.reducer
    }
})