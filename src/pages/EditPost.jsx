import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { createPost2, getPostById } from "../services/posts";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Title from "../components/Title";
import { LuCopyPlus, LuFilePen } from "react-icons/lu";
import { Box } from "@mui/joy";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditPost() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const {
        data: res,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: createPost2,
        onSuccess: () => {
            toast.success("Post updated successfully");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Something went wrong");
            console.error(err.response?.data?.message || err.message);
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

    if (isLoading) return <Loader />;

    if (error) return <Error />;

    return (
        <Box>
            <Title title="Edit Post" icon={LuFilePen} />
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
                                message:
                                    "Post title must be at least 3 characters",
                            },
                            maxLength: {
                                value: 50,
                                message:
                                    "Post title must be at most 50 characters",
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
        </Box>
    );
}
