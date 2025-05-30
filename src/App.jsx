import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="create-post" element={<CreatePost />} />
                <Route path="edit-post/:postId" element={<EditPost />} />
            </Route>
        </Routes>
    );
}

export default App;
