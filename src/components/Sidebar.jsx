import { Box, Button, Stack } from "@mui/joy";
import { Link } from "react-router";
import { LuCirclePlus, LuCopyPlus, LuHouse, LuUsers } from "react-icons/lu";
import { logout } from "../services/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

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
    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            toast.success("Logout successfully");
            console.log(data);
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
            console.error(err.response?.data?.message || err.message);
        },
    });

    function handleLogout() {
        mutate();
    }

    return (
        <aside>
            <Stack
                width={270}
                height="100vh"
                p="40px 24px"
                gap="1.5rem"
                sx={{ display: { xs: "none", sm: "flex" } }}
            >
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
                <Button
                    fullWidth
                    variant="plain"
                    // startDecorator={link.icon}
                    size="lg"
                    sx={{
                        padding: "16px",
                        justifyContent: "flex-start",
                    }}
                >
                    {/* {link.label} */}
                    Logout
                </Button>
            </Stack>
        </aside>
    );
}
