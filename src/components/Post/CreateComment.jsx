import { Avatar, Button, Card, Stack, Textarea } from "@mui/joy";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../services/comments";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { queryClient } from "../../main";

export default function CreateComment({ postId }) {
    const { isAuthenticated, user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            toast.success("Comment created successfully");
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            reset();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
            console.error(err.response?.data?.message || err);
        },
    });

    function handleComment({ content }) {
        mutate({ post: postId, author: user._id, content });
    }

    return (
        <>
            {isAuthenticated && (
                <form onSubmit={handleSubmit(handleComment)}>
                    <Card>
                        <Stack direction="row" gap={2}>
                            <Avatar />

                            <Textarea
                                placeholder="Write a comment..."
                                minRows={3}
                                maxRows={3}
                                sx={{ flex: 1 }}
                                {...register("content", {
                                    required: "Comment is required",
                                })}
                            />
                        </Stack>
                        <Button
                            type="submit"
                            sx={{ width: "fit-content", alignSelf: "flex-end" }}
                            loading={isPending}
                        >
                            Post Comment
                        </Button>
                    </Card>
                </form>
            )}
        </>
    );
}
