"use client";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICampaign} from "@/app/components/interfaces";

export interface campaignProps {
    campaigns: ICampaign[];
    loading: boolean;
}
const initialState: campaignProps = {
    campaigns: [],
    loading: false,
};

const campaignSlice = createSlice({
    name: "campaigns",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCampaigns: (state, action: PayloadAction<ICampaign[]>) => {
            state.campaigns = action.payload;
        },
        clearCampaigns: (state) => {
            state.campaigns = [];
            state.loading = false;
        },
    },
});

export const {
    setCampaigns,
    setLoading,
    clearCampaigns,
} = campaignSlice.actions;

export default campaignSlice.reducer;
