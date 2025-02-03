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
import { Instagram, YouTube, Twitter, Facebook, Favorite, Share, AttachMoney } from "@mui/icons-material"
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

// Mock data for campaigns
const campaigns = [
    {
        id: 1,
        title: "Summer Fashion Haul",
        brand: "Fashionista",
        image: "https://unsplash.com/photos/assorted-fruits-at-the-market--gOUx23DNks",
        description: "Showcase our latest summer collection in your unique style!",
        platforms: ["instagram", "youtube"],
        category: "Fashion",
        compensation: 1000,
    },
    {
        id: 2,
        title: "Healthy Smoothie Challenge",
        brand: "GreenBlend",
        image: "https://source.unsplash.com/random/400x200?smoothie,healthy",
        description: "Create and share your own smoothie recipes using our products!",
        platforms: ["instagram", "tiktok"],
        category: "Food & Beverage",
        compensation: 800,
    },
    {
        id: 3,
        title: "Tech Gadget Review",
        brand: "TechNova",
        image: "https://source.unsplash.com/random/400x200?technology,gadget",
        description: "Unbox and review our latest smart home devices!",
        platforms: ["youtube", "twitter"],
        category: "Technology",
        compensation: 1500,
    },
    // Add more campaign objects as needed
]

// Helper function to get the icon for each platform
const getPlatformIcon = (platform: string) => {
    switch (platform) {
        case "instagram":
            return <Instagram />
        case "youtube":
            return <YouTube />
        case "twitter":
            return <Twitter />
        case "facebook":
            return <Facebook />
        default:
            return null
    }
}

export default function Campaigns() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
        fetchCampaigns(dispatch, token)
    }, []);
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Available Campaigns
            </Typography>
            <Grid container spacing={3}>
                {campaigns.map((campaign) => (
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
                                        <Chip icon={<AttachMoney />} label={`$${campaign.compensation}`} color="success" size="small" />
                                    </Tooltip>
                                </Box>
                                <Box display="flex" flexWrap="wrap" mb={2}>
                                    {campaign.platforms.map((platform) => (
                                        <Tooltip key={platform} title={platform}>
                                            <IconButton size="small">{getPlatformIcon(platform)}</IconButton>
                                        </Tooltip>
                                    ))}
                                </Box>
                                <ColoredChip avatar={<Avatar>#</Avatar>} label={campaign.category} color="primary" />
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
                ))}
            </Grid>
        </Box>
    )
}

