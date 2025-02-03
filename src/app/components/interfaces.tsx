export interface IUser {
    name: string;
    user_type: string;
    email: string;
    id: number;
}


export interface UserFormData {
    name: string
    user_type?: string | null
    email: string
    password: string
    confirm_password: string
}

export interface ICampaign {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    user_id: string;
    campaignId: string;
};


export interface ILoginUser {
    email: string
    password: string
}