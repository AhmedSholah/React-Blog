import {
    Avatar,
    Box,
    Button,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Typography,
} from "@mui/joy";
import Logo from "./Logo";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, handleLogout } = useContext(AuthContext);

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p="16px 20px"
            component="nav"
            sx={{
                display: {
                    xs: "flex",
                    sm: "none",
                },
            }}
        >
            <Logo />
            {!isAuthenticated && (
                <Button onClick={() => navigate("/login")}>Login</Button>
            )}
            {isAuthenticated && (
                <Dropdown>
                    <MenuButton
                        variant="plain"
                        sx={{
                            padding: 0,
                            borderRadius: "50%",
                        }}
                    >
                        <Avatar size="sm">
                            {user?.username[0].toUpperCase()}
                        </Avatar>
                    </MenuButton>
                    <Menu>
                        <MenuItem disabled>Welcome, {user?.username}</MenuItem>
                        {/* <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem> */}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Dropdown>
            )}
        </Stack>
    );
}
