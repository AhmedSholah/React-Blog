import { Button, Stack, Typography, Link } from "@mui/joy";

export default function Error() {
    return (
        <Stack spacing={2} mt={6} alignItems="center">
            <Typography textAlign="center">
                Oops! Something went wrong. Please try again or return to the{" "}
                <Link href="/">home page</Link>.
            </Typography>
            <Button onClick={() => window.location.reload()}>Try again</Button>
        </Stack>
    );
}
