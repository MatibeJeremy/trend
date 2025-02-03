"use client";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "@/app/components/interfaces";

export interface authProps {
    loginLoading: boolean;
    registerLoading: boolean;
    selectedProfile: string | null;
    registrationSuccess: boolean;
    loginSuccess: boolean;
    user: IUser | null;
    token: string;
}
const initialState: authProps = {
    loginLoading: false,
    registerLoading: false,
    selectedProfile: null,
    registrationSuccess: false,
    loginSuccess: false,
    user: null,
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setLoginSuccess: (state, action: PayloadAction<boolean>) => {
            state.loginSuccess = action.payload;
        },
        setRegistrationLoading: (state, action: PayloadAction<boolean>) => {
            state.registerLoading = action.payload;
        },
        setRegistrationSuccess: (state, action: PayloadAction<boolean>) => {
            state.registrationSuccess = action.payload;
        },
        setSelectedProfile: (state, action) => {
            state.selectedProfile = action.payload;
        },
        setLoginLoading: (state, action) => {
            state.loginLoading = action.payload;
        },
        clearAuth: (state) => {
            state.loginLoading = false;
            state.selectedProfile = null;
            state.loginSuccess = false;
            state.registrationSuccess = false;
            state.user = null;
            state.token = "";
        },
    },
});

export const {
    setLoginSuccess,
    setLoginLoading,
    setSelectedProfile,
    setRegistrationLoading,
    setRegistrationSuccess,
    setUserData,
    setToken,
    clearAuth
} = authSlice.actions;

export default authSlice.reducer;
