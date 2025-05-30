import {
    BookmarkAdd,
    DeleteForever,
    Edit,
    MoreVert,
} from "@mui/icons-material";
import {
    AspectRatio,
    Avatar,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Divider,
    Dropdown,
    IconButton,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Typography,
} from "@mui/joy";
import DeletePostModal from "./Modals/DeletePostModal";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Post({ post, handleDeletePost }) {
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);
    const closeDeleteModal = () => {
        setShowDelete(false);
    };

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
                    <Avatar>JG</Avatar>
                    <Typography>John Doe</Typography>
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
                    <IconButton variant="plain" color="neutral" size="sm">
                        <BookmarkAdd />
                    </IconButton>
                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{
                                root: { variant: "outlined", color: "neutral" },
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
                                <ListItemDecorator sx={{ color: "inherit" }}>
                                    <DeleteForever />
                                </ListItemDecorator>{" "}
                                Delete Post
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </Stack>
                <Stack mt={2} mb={1}>
                    <Typography level="title-lg">{post.title}</Typography>
                    <Typography level="body-sm">{post.description}</Typography>
                </Stack>
            </div>
            <AspectRatio minHeight="120px" maxHeight="600px">
                <img
                    src={post.media[0]?.url}
                    // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt="post image"
                />
            </AspectRatio>
            <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                    <Typography
                        level="body-xs"
                        textColor="text.secondary"
                        sx={{ fontWeight: "md" }}
                    >
                        6.3k views
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography
                        level="body-xs"
                        textColor="text.secondary"
                        sx={{ fontWeight: "md" }}
                    >
                        1 hour ago
                    </Typography>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}
