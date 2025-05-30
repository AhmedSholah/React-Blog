import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route element={<PrivateRoute />}>
                    <Route path="create-post" element={<CreatePost />} />
                    <Route path="edit-post/:postId" element={<EditPost />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
