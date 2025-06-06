import api from "./api";

export const createPost = (formData) => {
    return api.post("/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getPosts = () => {
    return api.get("/posts");
};

export const getPostById = (id) => {
    return api.get(`/posts/${id}`);
};

export const updatePost = (id, formData) => {
    return api.patch(`/posts/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};
