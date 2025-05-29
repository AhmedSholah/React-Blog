import { Box, Button, Stack } from "@mui/joy";
import Title from "../../components/Title";
import { LuCopyPlus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import FormTextInput from "../../components/FormTextInput";
import FormTextArea from "../../components/FormTextArea";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPost2 } from "../../services/posts";
import FormFileUpload from "../../components/FormFileUpload";

export default function CreatePost() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: createPost2,
        onSuccess: (data) => {
            toast.success("Post created successfully");
            // navigate("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || err.message);
            console.error(
                "Login failed:",
                err.response?.data?.message || err.message
            );
        },
    });

    const onSubmit = (data) => {
        const formData = new FormData();

        for (const key in data) {
            if (key === "media" && data[key]?.length) {
                for (const file of data[key]) {
                    formData.append(key, file);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        mutate(formData);
    };

    return (
        <Stack alignItems="center">
            <Title
                title="Create Post"
                description="Share your thoughts with the world"
                icon={LuCopyPlus}
            />
            <Stack
                spacing={2}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                width={"100%"}
                maxWidth={1024}
            >
                <FormTextInput
                    name={"title"}
                    label={"Post Title"}
                    placeholder={"Enter your post title..."}
                    errors={errors}
                    register={register}
                    validation={{
                        required: "Post title is required",
                        minLength: {
                            value: 3,
                            message: "Post title must be at least 3 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "Post title must be at most 50 characters",
                        },
                    }}
                    isPending={isPending}
                />
                <FormTextArea
                    name={"description"}
                    label={"Description"}
                    placeholder={"Enter your description..."}
                    errors={errors}
                    register={register}
                    validation={{
                        required: "Description is required",
                        minLength: {
                            value: 3,
                            message:
                                "Description must be at least 3 characters",
                        },
                        maxLength: {
                            value: 1000,
                            message:
                                "Description must be at most 1000 characters",
                        },
                    }}
                    isPending={isPending}
                />
                {/* <FormFileUpload register={register} name={"media"} /> */}
                <FormFileUpload
                    register={register}
                    name="media"
                    errors={errors}
                    validation={{ required: "File is required" }}
                    isPending={isPending}
                />

                <Button type="submit" fullWidth loading={isPending}>
                    Create Post
                </Button>
            </Stack>
        </Stack>
    );
}
