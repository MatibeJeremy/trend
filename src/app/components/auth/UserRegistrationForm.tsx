"use client"

import React, {useEffect} from "react"
import { useState } from "react"
import {
    TextField,
    Button,
    Box,
    Typography,
    Container, Divider, CircularProgress,
} from "@mui/material"
import {useAppDispatch, useAppSelector} from "@/store";
import {Google, LinkedIn} from "@mui/icons-material";
import {RegisterUser} from "@/store/actions/auth";
import {useRouter} from "next/navigation";
import {UserFormData} from "@/app/components/interfaces";

export const UserRegistrationForm = () => {
    const [isRegistering, setIsRegistering] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userType = useAppSelector(state => state.auth.selectedProfile);
    const registrationLoading = useAppSelector(
        state => state.auth.registerLoading
    );
    const registrationSuccess = useAppSelector((state) => state.auth.registrationSuccess);

    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: "",
        user_type: userType,
        confirm_password: "",
    });

    const [errors, setErrors] = useState<Partial<UserFormData>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {}

        if (!formData.name && isRegistering) newErrors.name = "Name is required"
        if (!formData.email) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.password) newErrors.password = "Password is required"
        if(isRegistering){
            if (formData.password !== formData.confirm_password) {
                newErrors.confirm_password = "Passwords do not match"
            }
        }
        console.log(newErrors)
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            RegisterUser(dispatch, formData).then(() => {
                setIsRegistering(false);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    user_type: "",
                    confirm_password: "",
                });
            });
        }
    }

    useEffect(() => {
        if(userType ==null){
            router.push("/")
        }
        if(registrationSuccess){
            setIsRegistering(false);
        }
    },[])

    return (
        <Container maxWidth="sm" sx={{
            background: "white",
            borderRadius: "20px",
            width: "40%"
        }}>
            <Box sx={{ mt: "15%", mb: 4, padding: "20px", justifyContent: "center" }}>
                <Typography sx={{
                    color: "black",
                    fontFamily: "Roboto",
                    display: "flex",
                    fontSize: "24px",
                }}>
                    {isRegistering ? "User Registration" : "Log In"}
                </Typography>
                <Typography sx={{
                    color: "black",
                    fontFamily: "Roboto",
                    display: "flex",
                }}>
                    {isRegistering ? "If you already have an account," : "Dont have an account?"}
                </Typography>
                <Typography
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                    }}
                    sx={{
                    color: "blue",
                    fontFamily: "Roboto",
                    display: "flex",
                    cursor: "pointer",
                    width: "15%"
                }}>
                    {isRegistering ? "Log in" : "Register"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{
                            display: !isRegistering ? "none" : "block",
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password}
                        sx={{
                            display: !isRegistering ? "none" : "block",
                        }}
                    />
                   <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2, backgroundColor: "#2c003e", textTransform: "none" }}>
                       {registrationLoading ? <CircularProgress size={40}/> : !isRegistering ? "Log in" : "Register"}
                    </Button>
                </form>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Google />}
                    // onClick={() => handleOAuthLogin("Google")}
                    sx={{
                        mb: 2,
                        color: "#4285F4",
                        borderColor: "#4285F4",
                        "&:hover": {
                            backgroundColor: "#4285F410",
                            borderColor: "#4285F4",
                        },
                    }}
                >
                    Continue with Google
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    // onClick={() => handleOAuthLogin("LinkedIn")}
                    sx={{
                        color: "#0077B5",
                        borderColor: "#0077B5",
                        "&:hover": {
                            backgroundColor: "#0077B510",
                            borderColor: "#0077B5",
                        },
                    }}
                >
                    Continue with LinkedIn
                </Button>
            </Box>
        </Container>
    )
}

