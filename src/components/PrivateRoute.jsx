import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) return <Navigate to="/login" />;

    return <Outlet />;
}
