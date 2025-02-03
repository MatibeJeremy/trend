import {Dispatch} from "redux";
import {ILoginUser, UserFormData} from "@/app/components/interfaces";
import axios from "axios";
import {toast} from "react-toastify";
import {
    clearAuth,
    setLoginLoading,
    setLoginSuccess,
    setRegistrationLoading,
    setRegistrationSuccess, setToken,
    setUserData
} from "@/store/reducers/auth";
import {clearCampaigns} from "@/store/reducers/campaigns";

export const RegisterUser = async (dispatch: Dispatch, payload: UserFormData) => {
    dispatch(setRegistrationLoading(true));
    axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/users`, payload)
        .then((response) => {
            dispatch(setRegistrationLoading(false));
            toast.success( "User created successfully" );
            dispatch(setRegistrationSuccess(true));
            return response;
        })
        .catch((error) => {
            dispatch(setRegistrationLoading(false));
            dispatch(setRegistrationSuccess(false));
            toast.error(error.response.data.message || error.response.message[0]);
            return error;
        });
}

export const LoginUser = async (dispatch: Dispatch, payload: ILoginUser) => {
    dispatch(setLoginLoading(true));
    axios
        .post(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, payload)
        .then((response) => {
            dispatch(setLoginLoading(false));
            dispatch(setUserData(response.data.user));
            dispatch(setToken(response.data.token));
            toast.success( "User logged in successfully" );
            dispatch(setLoginSuccess(true));
            return response;
        })
        .catch((error) => {
            dispatch(setLoginLoading(false));
            dispatch(setLoginSuccess(false));
            toast.error(error.response.data.message || error.response.message[0]);
            return error;
        });
}

export const LogOutUser = async (dispatch: Dispatch) => {
    dispatch(clearAuth());
    dispatch(clearCampaigns())
}