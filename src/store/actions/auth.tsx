import {Dispatch} from "redux";
import {UserFormData} from "@/app/components/interfaces";
import axios from "axios";
import {toast} from "react-toastify";
import {setRegistrationLoading, setRegistrationSuccess} from "@/store/reducers/auth";

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
            dispatch(setRegistrationSuccess(true));
            if(error.response.status === 409){
                toast.error( error.response.data.message);
            }
            return error;
        });
}