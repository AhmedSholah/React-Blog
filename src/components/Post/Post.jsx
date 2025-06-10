import React, { memo } from "react";
import {
    BookmarkAdd,
    DeleteForever,
    Edit,
    FavoriteBorder,
    MoreVert,
    Share,
} from "@mui/icons-material";
import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardOverflow,
    Divider,
    Dropdown,
    IconButton,
    Link,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Textarea,
    Tooltip,
    Typography,
} from "@mui/joy";
import DeletePostModal from "../Modals/DeletePostModal";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { LuMessageCircle, LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/comments";
import { timeAgo } from "../../utils/timeAgo";
import { createReaction, getReactions } from "../../services/reactions";
import { TbShare3 } from "react-icons/tb";
import { toast } from "sonner";
import { sharePost } from "../../services/share";
import { queryClient } from "../../main";

const Post = ({ post, handleDeletePost }) => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [showComments, setShowComments] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const closeDeleteModal = () => {
        setShowDelete(false);
    };

    const { data } = useQuery({
        queryKey: ["comments", post._id],
        queryFn: () => getComments(post._id),
    });

    const { data: reactionsData } = useQuery({
        queryKey: ["reactions", post._id],
        queryFn: () => getReactions(post._id),
    });

    const { mutate: shareAPost, isPending } = useMutation({
        mutationFn: sharePost,
        onSuccess: () => {
            toast.success("Post shared successfully");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
            console.error(err.response?.data?.message || err);
        },
    });

    const { mutate: reactToPost } = useMutation({
        mutationFn: createReaction,
        onSuccess: () => {
            toast.success("Reaction added successfully");
            queryClient.invalidateQueries({
                queryKey: ["reactions", post._id],
            });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
            console.error(err.response?.data?.message || err);
        },
    });

    function handleShare(postId) {
        shareAPost(postId);
    }

    function handlePostReaction(type) {
        reactToPost({ postId: post._id, type });
    }

    const comments = data?.data?.data?.comments;
    const commentsCount = data?.data?.data?.count;

    return (
        <Card color="neutral" sx={{ maxWidth: "640px" }}>
            <DeletePostModal
                open={showDelete}
                postId={post._id}
                handleDeletePost={handleDeletePost}
                closeDeleteModal={closeDeleteModal}
            />
            <div>
                <Stack direction alignItems="center" gap={1}>
                    <Avatar>{post.author.username[0].toUpperCase()}</Avatar>
                    <Box>
                        <Typography>{post.author.username}</Typography>
                        <Typography fontSize="sm">
                            {timeAgo(post.createdAt)}
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: "absolute",
                        top: "0.875rem",
                        right: "0.5rem",
                    }}
                >
                    {isAuthenticated && (
                        <Tooltip title="Share">
                            <IconButton
                                variant="plain"
                                color="neutral"
                                size="sm"
                                onClick={() => handleShare(post._id)}
                                loading={isPending}
                            >
                                <TbShare3 size="24px" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {post.author?._id === user?._id && (
                        <Dropdown>
                            <MenuButton
                                slots={{ root: IconButton }}
                                slotProps={{
                                    root: {
                                        variant: "outlined",
                                        color: "neutral",
                                    },
                                }}
                                component="div"
                            >
                                <MoreVert />
                            </MenuButton>
                            <Menu placement="bottom-end">
                                <MenuItem
                                    onClick={() =>
                                        navigate(`/edit-post/${post._id}`)
                                    }
                                >
                                    <ListItemDecorator>
                                        <Edit />
                                    </ListItemDecorator>{" "}
                                    Edit post
                                </MenuItem>
                                <MenuItem
                                    color="danger"
                                    onClick={() => setShowDelete(true)}
                                >
                                    <ListItemDecorator
                                        sx={{ color: "inherit" }}
                                    >
                                        <DeleteForever />
                                    </ListItemDecorator>{" "}
                                    Delete Post
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                </Stack>
                <Stack mt={2} mb={1}>
                    <Typography level="title-lg">{post.title}</Typography>
                    <Typography level="body-sm">{post.description}</Typography>
                </Stack>
            </div>
            <AspectRatio minHeight="120px" maxHeight="600px">
                <img src={post.media[0]?.url} loading="lazy" alt="post image" />
            </AspectRatio>
            <Divider sx={{ margin: "0" }} />
            <Stack
                sx={{ flexDirection: { xs: "col", md: "row" } }}
                gap={0.5}
                justifyContent="space-between"
            >
                <Stack direction="row" gap={1}>
                    <Button
                        variant="danger"
                        color="plain"
                        startDecorator={<FavoriteBorder />}
                        onClick={() => handlePostReaction("love")}
                    >
                        {reactionsData?.data?.data?.love || 0}
                    </Button>
                    <Button
                        variant="plain"
                        startDecorator={<LuThumbsUp />}
                        onClick={() => handlePostReaction("like")}
                    >
                        {reactionsData?.data?.data?.like || 0}
                    </Button>
                    <Button
                        variant="plain"
                        color="neutral"
                        startDecorator={<LuThumbsDown />}
                        onClick={() => handlePostReaction("dislike")}
                    >
                        {reactionsData?.data?.data?.dislike || 0}
                    </Button>
                </Stack>
                <Button
                    variant={showComments ? "soft" : "plain"}
                    startDecorator={<LuMessageCircle />}
                    onClick={() => setShowComments(!showComments)}
                >
                    {commentsCount} Comments
                </Button>
            </Stack>
            {showComments && (
                <>
                    <Divider sx={{ margin: "0" }} />
                    <CreateComment postId={post._id} />
                    {comments.map((comment) => (
                        <Comment
                            username={comment.author.username}
                            comment={comment.content}
                            createdAt={comment.createdAt}
                        />
                    ))}
                </>
            )}
        </Card>
    );
};

export default memo(Post);
