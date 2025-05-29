import { Box, Stack, Typography } from "@mui/joy";
import React from "react";

const Title = React.memo(({ title, description, icon: Icon }) => {
    console.log("Title rerender");
    return (
        <Box mb="2.5rem">
            <Stack direction="row">
                <Stack justifyContent="center" alignItems={"center"} mr={1}>
                    <Icon size={30} />
                </Stack>
                <Typography fontSize={30} fontWeight="bold">
                    {title}
                </Typography>
            </Stack>
            <Typography fontSize={14} color="text.tertiary">
                {description}
            </Typography>
        </Box>
    );
});

export default Title;
