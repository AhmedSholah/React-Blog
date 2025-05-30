import { Box, Button, Stack, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router";
import {
    LuCirclePlus,
    LuCopyPlus,
    LuHouse,
    LuLogOut,
    LuUsers,
} from "react-icons/lu";
import { logout } from "../services/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const links = [
    {
        label: "Home",
        href: "/",
        icon: <LuHouse />,
    },
    {
        label: "People",
        href: "/about",
        icon: <LuUsers />,
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
                    <Typography fontWeight="bold">Blog</Typography>
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
