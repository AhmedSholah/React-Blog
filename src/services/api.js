import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // send cookies with requests
    // headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    // },
});

export default api;
