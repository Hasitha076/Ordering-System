import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from "@mui/icons-material/Search";
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import TemporaryDrawer from "../../components/drawer";
import { useLoginOutMutation } from "../../api/dataApi";
import { Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginStatus } from "../../contextApi/GlobalApi";

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [open, setOpen] = useState(false);
    const [logOut] = useLoginOutMutation()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const { setIsLoggedIn } = useContext(loginStatus)


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={toggleDrawer(true)}>
                    <Badge badgeContent={4} color="warning">
                        <NotificationsOutlinedIcon color="action" />
                    </Badge>
                </IconButton>
                <IconButton>
                    <Badge badgeContent={2} color="error">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <LogoutIcon onClick={() => {
                        logOut().then((response) => {
                            if (response.data) {
                                setIsLoggedIn(false);
                                < Navigate to="/login" replace />
                                toast.success("User logout");
                            }
                        })

                    }} />
                </IconButton>

                <TemporaryDrawer open={open} onClose={toggleDrawer(false)} />
            </Box>
        </Box>

    );
};

export default TopBar;
