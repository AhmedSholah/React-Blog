import { InfoOutlined } from "@mui/icons-material";
import { Box, FormControl, FormHelperText, FormLabel, Input } from "@mui/joy";

export default function FormTextInput({
    name,
    label,
    placeholder,
    errors,
    register,
    validation,
    isPending,
}) {
    return (
        <FormControl error={!!errors[name]}>
            <FormLabel>{label}</FormLabel>
            <Input
                size="lg"
                placeholder={placeholder}
                {...register(name, validation)}
                disabled={isPending}
            />
            <Box
                sx={{
                    visibility: !!errors[name] ? "visible" : "hidden",
                }}
            >
                <FormHelperText>
                    <InfoOutlined />
                    {errors[name]?.message}
                </FormHelperText>
            </Box>
        </FormControl>
    );
}
