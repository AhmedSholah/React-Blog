import React from "react";
import { Box, Stack, Typography } from "@mui/joy";

const Title = React.memo(({ title, description, icon: Icon }) => {
    return (
        <Box mb="2.5rem">
            <Stack direction="row">
                {!!Icon && (
                    <Stack justifyContent="center" alignItems={"center"} mr={1}>
                        <Icon size={30} />
                    </Stack>
                )}
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
