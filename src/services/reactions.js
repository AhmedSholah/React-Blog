import api from "./api";

export const createReaction = (postId, data) => {
    return api.post(`posts/${postId}/reactions`, data);
};

export const getReactions = (postId) => {
    return api.get(`posts/${postId}/reactions`);
};
