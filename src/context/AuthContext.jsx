import { createContext, useEffect, useState } from "react";
import { fetchUser, logout } from "../services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import GlobalLoader from "../components/GlobalLoader";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const isAuthenticated = !!user;

    const { data, isSuccess, isPending } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    useEffect(() => {
        if (isSuccess && data?.data?.data && !user) {
            setUser(data.data.data);
        }
    }, [data]);

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/");
            toast.success("Loggedout successfully");
            setUser(null);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message);
            console.error(err.response?.data?.message || err);
        },
    });

    function handleLogout() {
        mutate();
    }

    // if (!isSuccess && isPending) return <GlobalLoader />;

    return (
        <AuthContext.Provider value={{ user, handleLogout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
