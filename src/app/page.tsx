import UserTypeSelector from "@/app/components/home/UserTypeSelector";
import {Grid, Stack} from "@mui/material";

export default function Home() {
    return (
        <Grid sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
        }}>
            <Stack sx={{
                width: "70%",
                margin: "auto",
            }}>
                <h2 style={{display:"flex", margin: "auto", padding: "20px"}}>Select Which Type of Profile you&#39;d Like</h2>
                <UserTypeSelector />
            </Stack>
        </Grid>
  );
}
