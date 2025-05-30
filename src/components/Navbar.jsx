import {
    Avatar,
    Box,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Typography,
} from "@mui/joy";
import Logo from "./Logo";

export default function Navbar() {
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
            <Dropdown>
                <MenuButton
                    variant="plain"
                    sx={{
                        padding: 0,
                        borderRadius: "50%",
                    }}
                >
                    <Avatar size="sm" />
                </MenuButton>
                <Menu>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </Menu>
            </Dropdown>
        </Stack>
    );
}
