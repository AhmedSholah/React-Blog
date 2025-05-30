import axios from "axios";

const api = axios.create({
    baseURL: "https://react-project-nest-production.up.railway.app",
    // baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
