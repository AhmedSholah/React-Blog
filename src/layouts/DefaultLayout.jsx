import { Outlet } from "react-router";
import Sidebar from "../components/SideBar";
import { Box, Stack } from "@mui/joy";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
    return (
        <Stack>
            <Navbar />
            <Box component="main" sx={{ display: "flex" }}>
                <Sidebar />
                <Box
                    bgcolor="#f9fafb"
                    padding="56px"
                    sx={{
                        flex: 1,
                        maxHeight: { lg: "100vh" },
                        overflowY: "scroll",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Stack>
    );
}
