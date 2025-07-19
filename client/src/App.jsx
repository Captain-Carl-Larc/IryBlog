import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import Blogs from "./pages/blogs";
import Blog from "./pages/blog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/blogs/:blogId" element={<Blog />} />
      </Route>
    </Routes>
  );
}

export default App;
