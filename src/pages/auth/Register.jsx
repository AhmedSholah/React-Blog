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
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { toast } from "sonner";
import { queryClient } from "../../main";
import Logo from "../../components/Logo";

const register = async (data) => {
    const response = await api.post("auth/register", data);
    return response.data;
};

export default function Register() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Account created successfully");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
            console.error(
                "Login failed:",
                err.response?.data?.message || err.message
            );
        },
    });

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data) => {
        const { confirmPassword, ...rest } = data;
        mutate(rest);
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
                    Create an account
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
                    Please enter your details below to create a new account.
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                >
                    <FormControl error={!!errors.username}>
                        <Input
                            size="lg"
                            placeholder="Username"
                            {...registerField("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Username must be at least 3 characters",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Username must be less than 32 characters",
                                },
                            })}
                            disabled={isPending}
                        />
                        <Box
                            sx={{
                                visibility: !!errors.username
                                    ? "visible"
                                    : "hidden",
                            }}
                        >
                            <FormHelperText>
                                <InfoOutlined />
                                {errors?.username?.message}
                            </FormHelperText>
                        </Box>
                    </FormControl>

                    <FormControl error={!!errors.email}>
                        <Input
                            size="lg"
                            placeholder="Your Email"
                            {...registerField("email", {
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
                            {...registerField("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                maxLength: {
                                    value: 128,
                                    message:
                                        "Password must be less than 128 characters",
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
                                    ? "visible"
                                    : "hidden",
                            }}
                        >
                            <FormHelperText>
                                <InfoOutlined />
                                {errors?.password?.message}
                            </FormHelperText>
                        </Box>
                    </FormControl>

                    <FormControl error={!!errors.confirmPassword}>
                        <Input
                            size="lg"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            disabled={isPending}
                            {...registerField("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
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
                                visibility: !!errors.confirmPassword
                                    ? "visible"
                                    : "hidden",
                            }}
                        >
                            <FormHelperText>
                                <InfoOutlined />
                                {errors?.confirmPassword?.message}
                            </FormHelperText>
                        </Box>
                    </FormControl>

                    <Button
                        type="submit"
                        loading={isPending}
                        size="lg"
                        sx={{ width: "100%" }}
                    >
                        Register
                    </Button>
                </form>
                <Typography mt={3} textAlign="center">
                    Already have an account?{" "}
                    <Link to="/login">
                        <JoyLink component="span" underline="none">
                            Login
                        </JoyLink>
                    </Link>
                </Typography>
            </Stack>
        </Container>
    );
}
