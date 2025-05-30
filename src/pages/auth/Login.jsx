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
import { Link, useNavigate } from "react-router";
import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { toast } from "sonner";
import { queryClient } from "../../main";
import Logo from "../../components/Logo";

const login = async (credentials) => {
    const response = await api.post("auth/login", credentials);
    return response.data;
};

export default function Login() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Logged in successfully");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || err.message);
            console.error(
                "Login failed:",
                err.response?.data?.message || err.message
            );
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "123@gmail.com",
            password: "123@gmail.com",
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data) => {
        mutate(data);
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
            <Logo />
            <Stack
                direction="column"
                mt={5}
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
                            disabled={isPending}
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
                            disabled={isPending}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                maxLength: {
                                    value: 128,
                                    message:
                                        "Password must be at most 128 characters",
                                },
                            })}
                            endDecorator={
                                <IconButton
                                    variant="plain"
                                    color="primary"
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

                    <Button
                        type="submit"
                        loading={isPending}
                        size="lg"
                        sx={{ width: "100%" }}
                    >
                        Login
                    </Button>
                </form>
                <Typography mt={3} textAlign="center">
                    Don't have an account?{" "}
                    <Link to="/register">
                        <JoyLink underline="none">Register</JoyLink>
                    </Link>
                </Typography>
            </Stack>
        </Container>
    );
}
