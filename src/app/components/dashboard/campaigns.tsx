"use client"


import {
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Box,
    styled,
} from "@mui/material"
import { Favorite, Share, AttachMoney } from "@mui/icons-material"
import {useEffect} from "react";
import {fetchCampaigns} from "@/store/actions/campaigns";
import {useAppDispatch, useAppSelector} from "@/store";

// Styled components for custom effects
const StyledCard = styled(Card)(({ theme }) => ({
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[10],
    },
}))

const ColoredChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    "& .MuiChip-avatar": {
        backgroundColor: "transparent",
        color: theme.palette.common.white,
    },
}))


export default function Campaigns() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const campaigns = useAppSelector(state => state.campaigns.campaigns);

    useEffect(() => {
        fetchCampaigns(dispatch, token)
    }, []);
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Available Campaigns
            </Typography>
            <Grid container spacing={3}>
                {campaigns.map((campaign) => {
                    const status = new Date(campaign.deadline) > new Date();

                    return (
                        <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                            <StyledCard>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {campaign.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {campaign.description}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                src={`https://logo.clearbit.com/${campaign.brand.toLowerCase()}.com`}
                                                alt={campaign.brand}
                                            />
                                            <Typography variant="subtitle2" sx={{ ml: 1 }}>
                                                {campaign.brand}
                                            </Typography>
                                        </Box>
                                        <Tooltip title={`$${campaign.compensation}`}>
                                            <Chip
                                                icon={<AttachMoney />}
                                                label={`$${campaign.compensation}`}
                                                color="success"
                                                size="small"
                                            />
                                        </Tooltip>
                                    </Box>
                                    <ColoredChip avatar={<Avatar>#</Avatar>} label={campaign.category} color="primary" />
                                    <Typography sx={{ marginTop: "5%", fontSize: "14px" }}>
                                        Status: {status ? "Active" : "Expired"}
                                    </Typography>
                                    <Typography sx={{ marginTop: "5%", fontSize: "14px" }}>
                                        Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <Box display="flex" justifyContent="space-between" p={1}>
                                    <IconButton aria-label="add to favorites">
                                        <Favorite />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <Share />
                                    </IconButton>
                                </Box>
                            </StyledCard>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )
}

