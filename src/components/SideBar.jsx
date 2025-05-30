import { Avatar, Box, Button, Stack, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router";
import { LuBookOpen, LuCopyPlus, LuHouse, LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";

const links = [
    {
        label: "Home",
        href: "/",
        icon: <LuHouse />,
    },
    {
        label: "Create Post",
        href: "/create-post",
        icon: <LuCopyPlus />,
    },
];

export default function Sidebar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, handleLogout } = useContext(AuthContext);

    return (
        <aside>
            <Stack
                width={270}
                justifyContent="space-between"
                height="100vh"
                p="40px 24px"
                sx={{ display: { xs: "none", sm: "flex" } }}
            >
                <Stack gap="1.5rem">
                    <Logo />
                    {isAuthenticated && (
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            px="16px"
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Avatar fontWeight="bold">
                                    {user?.username[0].toUpperCase()}
                                </Avatar>
                            </Box>
                            <Typography level="title-lg" fontWeight="bold">
                                {user?.username}
                            </Typography>
                        </Stack>
                    )}
                    {links.map((link) => (
                        <Link key={link.href} to={link.href}>
                            <Button
                                fullWidth
                                variant="plain"
                                startDecorator={link.icon}
                                size="lg"
                                sx={{
                                    padding: "16px",
                                    justifyContent: "flex-start",
                                }}
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                </Stack>
                {isAuthenticated ? (
                    <Button
                        fullWidth
                        variant="plain"
                        color="danger"
                        startDecorator={<LuLogOut />}
                        size="lg"
                        sx={{
                            padding: "16px",
                            justifyContent: "flex-start",
                        }}
                        onClick={handleLogout}
                        // loading={isPending}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="plain"
                        color="success"
                        startDecorator={<LuLogOut />}
                        size="lg"
                        sx={{
                            padding: "16px",
                            justifyContent: "flex-start",
                        }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                )}
            </Stack>
        </aside>
    );
}
