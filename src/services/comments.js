import api from "./api";

export const createComment = (data) => {
    return api.post("/comments", data);
};

export const getComments = (postId) => {
    return api.get(`/posts/${postId}/comments`);
};
