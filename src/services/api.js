import axios from "axios";

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: "https://react-project-nest-production.up.railway.app/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
