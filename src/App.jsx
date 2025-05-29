import { Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import CreatePost from "./pages/create-post/CreatePost";

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="create-post" element={<CreatePost />} />
            </Route>

            {/* <Route path="concerts">
                <Route index element={<ConcertsHome />} />
                <Route path=":city" element={<City />} />
                <Route path="trending" element={<Trending />} />
            </Route> */}
        </Routes>
    );
}

export default App;
