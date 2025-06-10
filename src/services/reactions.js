import api from "./api";

export const createReaction = ({ postId, type }) => {
    return api.post(`posts/${postId}/reactions`, { type });
};

export const getReactions = (postId) => {
    return api.get(`posts/${postId}/reactions`);
};
