import { Box, Stack, Typography } from "@mui/joy";
import { LuBookOpen } from "react-icons/lu";
import { useNavigate } from "react-router";

export default function Logo() {
    const navigate = useNavigate();

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            px="16px"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
        >
            <Box
                sx={{
                    backgroundColor: "primary.500",
                    borderRadius: "8px",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <LuBookOpen size={18} color="white" />
            </Box>
            <Typography
                level="h4"
                sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Blogify
            </Typography>
        </Stack>
    );
}
