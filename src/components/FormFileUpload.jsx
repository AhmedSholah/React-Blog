// import * as React from "react";
// import Button from "@mui/joy/Button";
// import SvgIcon from "@mui/joy/SvgIcon";
// import { styled } from "@mui/joy";

// const VisuallyHiddenInput = styled("input")`
//     clip: rect(0 0 0 0);
//     clip-path: inset(50%);
//     height: 1px;
//     overflow: hidden;
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     white-space: nowrap;
//     width: 1px;
// `;

// export default function FormFileUpload({ register, name, isPending }) {
//     return (
//         <Button
//             component="label"
//             role={undefined}
//             tabIndex={-1}
//             variant="outlined"
//             color="neutral"
//             disabled={isPending}
//             fullWidth
//             sx={{
//                 marginBottom: "26px",
//             }}
//             startDecorator={
//                 <SvgIcon>
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//                         />
//                     </svg>
//                 </SvgIcon>
//             }
//         >
//             Upload a file
//             <VisuallyHiddenInput
//                 type="file"
//                 {...register(name, { required: "yes" })}
//             />
//         </Button>
//     );
// }
import * as React from "react";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { FormControl, Stack, styled } from "@mui/joy";
import { Box, FormHelperText } from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import { LuImagePlus } from "react-icons/lu";

const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

export default function FormFileUpload({
    register,
    name,
    errors,
    validation,
    isPending,
}) {
    const hasError = !!errors[name];

    return (
        <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color={hasError ? "danger" : "neutral"}
            disabled={isPending}
            fullWidth
            sx={{
                marginBottom: "16px",
                display: "flex",
                flexDirection: "column",
            }}
            startDecorator={<LuImagePlus />}
        >
            Upload an image or video
            <FormControl error={!!errors[name]}>
                <VisuallyHiddenInput
                    type="file"
                    {...register(name, validation)}
                />
                {!!errors[name] && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        mt={2}
                    >
                        <InfoOutlined fontSize="small" />
                        <FormHelperText>{errors[name]?.message}</FormHelperText>
                    </Stack>
                )}
            </FormControl>
        </Button>
    );
}
