import { CircularProgress, Stack, Typography } from "@mui/joy";
import Post from "../components/Post";
import Title from "../components/Title";
import { LuCopyPlus } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/posts";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function Home() {
    const {
        data: res,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

    function handleDeletePost(postId) {
        console.log(postId);
    }

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div>
            <Title
                title="Home Feed"
                description="Discover amazing content from other creators"
            />
            <Stack spacing={3}>
                {isLoading ? (
                    <Loader />
                ) : (
                    res.data.data.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            handleDeletePost={handleDeletePost}
                        />
                    ))
                )}
            </Stack>
        </div>
    );
}
