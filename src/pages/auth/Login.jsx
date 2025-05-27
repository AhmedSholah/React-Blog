import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import FormHelperText from "@mui/joy/FormHelperText";
import FormControl from "@mui/joy/FormControl";
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Container,
    IconButton,
    Link as JoyLink,
    Stack,
    Typography,
} from "@mui/joy";
import { Link } from "react-router";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: 420,
            }}
        >
            <Stack
                direction="column"
                sx={{
                    width: "100%",
                }}
            >
                <Typography
                    component="h1"
                    textAlign="center"
                    fontSize={30}
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                    }}
                >
                    Log in to your account
                </Typography>
                <Typography
                    component="p"
                    textAlign="center"
                    fontSize={16}
                    sx={{
                        color: "text.tertiary",
                        mb: 2,
                    }}
                >
                    Welcome back! Please enter your details.
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <FormControl error={!!errors.email}>
                        <Input
                            size="lg"
                            placeholder="Your Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        <Box
                            sx={{
                                visibility: !!errors.email
                                    ? "visable"
                                    : "hidden",
                            }}
                        >
                            <FormHelperText>
                                <InfoOutlined />
                                {errors?.email?.message}
                            </FormHelperText>
                        </Box>
                    </FormControl>

                    <FormControl error={!!errors.password}>
                        <Input
                            size="lg"
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            endDecorator={
                                <IconButton
                                    variant="plain"
                                    color="primary"
                                    // sx={{
                                    //     cursor: "pointer",
                                    //     display: "flex",
                                    //     alignItems: "center",

                                    //     color: "text.tertiary",
                                    // }}
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            }
                        />

                        <Box
                            sx={{
                                visibility: !!errors.password
                                    ? "visable"
                                    : "hidden",
                            }}
                        >
                            <FormHelperText>
                                <InfoOutlined />
                                {errors?.password?.message}
                            </FormHelperText>
                        </Box>
                    </FormControl>

                    <Button type="submit" size="lg" sx={{ width: "100%" }}>
                        Login
                    </Button>
                </form>
                <Typography mt={3} textAlign="center">
                    Don't have an account?{" "}
                    <Link to="/register">
                        <JoyLink underline="none">register</JoyLink>
                    </Link>
                </Typography>
            </Stack>
        </Container>
    );
}
