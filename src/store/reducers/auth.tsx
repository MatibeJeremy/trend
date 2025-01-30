"use client";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface authProps {
    loginLoading: boolean;
    registerLoading: boolean;
    selectedProfile: string | null;
    registrationSuccess: boolean;
}
const initialState: authProps = {
    loginLoading: false,
    registerLoading: false,
    selectedProfile: null,
    registrationSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
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
        },
    },
});

export const {
    setLoginLoading,
    setSelectedProfile,
    setRegistrationLoading,
    setRegistrationSuccess,
    clearAuth
} = authSlice.actions;

export default authSlice.reducer;
