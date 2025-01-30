export interface ICreateUser {
    name: string;
    user_type?: string;
    email: string;
    password: string;
    confirm_password: string;
}


export interface UserFormData {
    name: string
    user_type?: string
    email: string
    password: string
    confirm_password: string
}