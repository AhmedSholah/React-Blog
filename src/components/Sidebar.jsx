import { Box, Button, Stack } from "@mui/joy";
import { Link } from "react-router";
import { LuCirclePlus, LuCopyPlus, LuHouse, LuUsers } from "react-icons/lu";

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
                    <Link to={link.href}>
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
        </aside>
    );
}
