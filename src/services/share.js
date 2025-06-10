import api from "./api";

export const sharePost = (postId) => {
    return api.post(`posts/${postId}/share`);
};
