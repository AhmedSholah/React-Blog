import {
    Card,
    CardContent,
    Stack,
    Link,
    Avatar,
    Box,
    Typography,
} from "@mui/joy";
import { Link as RouterLink } from "react-router";
import { timeAgo } from "../../utils/timeAgo";

export default function Comment({ username, comment, createdAt }) {
    return (
        <Stack>
            <Card>
                <CardContent>
                    <Stack direction="row" gap={2}>
                        <Link
                            component={RouterLink}
                            to={`/user/${username}`}
                            fontWeight="bold"
                            mr={1}
                            height="fit-content"
                        >
                            <Avatar />
                        </Link>
                        <Box>
                            <Typography mb={1}>
                                <Link
                                    component={RouterLink}
                                    to={`/user/${username}`}
                                    fontWeight="bold"
                                    mr={1}
                                >
                                    {username}
                                </Link>
                                <Typography fontSize="sm" color="neutral">
                                    {timeAgo(createdAt)}
                                </Typography>
                            </Typography>
                            <Typography fontSize="sm" sx={{ color: "black" }}>
                                {comment}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}
