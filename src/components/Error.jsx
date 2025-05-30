import { Button, Stack, Typography } from "@mui/joy";

export default function Error() {
    return (
        <Stack>
            <Typography textAlign={"center"}>
                Some error occured or go back to the home page
            </Typography>
            <Button
                sx={{
                    margin: "auto",
                    marginTop: "1rem",
                    width: "fit-content",
                }}
                onClick={() => window.location.reload()}
            >
                Try again
            </Button>
        </Stack>
    );
}
