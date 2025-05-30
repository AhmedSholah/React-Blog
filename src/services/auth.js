import api from "./api";

export const fetchUser = () => {
    console.log("fetching user");
    return api.get("/auth/me");
};

export const logout = () => {
    return api.post("/auth/logout");
};
