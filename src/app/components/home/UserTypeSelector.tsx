"use client"

import {Button, ButtonGroup, Stack, Typography} from "@mui/material"
import {AccountCircle} from '@mui/icons-material';
import {setSelectedProfile} from "@/store/reducers/auth";
import {useAppDispatch} from "@/store";
import {useRouter} from "next/navigation";


export default function UserTypeSelector() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return (
        <ButtonGroup sx={{
            gap: "20px",
            height: "40vh",
            borderRadius: "9999px",
        }} fullWidth variant="contained" style={{ marginBottom: "1.5rem" }}>
                <Button
                    onClick={ async() => {
                        dispatch(setSelectedProfile("INFLUENCER"));
                        router.push("/auth");
                    }}
                    sx={{
                    background: "#2c003e",
                    borderRadius: "9999px"
                }}>
                    <Stack sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <AccountCircle sx={{ width: '30%', height: '30%', margin: 'auto' }} />
                        <Typography>Influencer</Typography>
                    </Stack>
                </Button>
            <Button
                onClick={async () => {
                    dispatch(setSelectedProfile("BRAND"));
                    router.push("/auth");
                }}
                sx={{
                background: "#ff0080",
                borderRadius: "9999px"
            }}>
                <Stack sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <AccountCircle sx={{ width: '30%', height: '30%', margin: 'auto' }} />
                    <Typography>Brand</Typography>
                </Stack>
            </Button>
        </ButtonGroup>
    )
}

