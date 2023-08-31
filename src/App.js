import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import BlogDetailPage from "./pages/blogDetail/BlogDetailPage";
import HomePage from "./pages/home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import NewPost from "./pages/admin/screens/posts/NewPost";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPost from "./pages/admin/screens/posts/EditPost";
import BlogPage from "./pages/home/BlogPage";
import Users from "./pages/admin/screens/Users";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./pages/admin/screens/Categories";

function App() {
  const userState = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const getCategories = async () => {
    try {
      const url = "/api/cat/allcategories"; // Replace with your actual URL
      const token = userState.userInfo.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const postData = {};

      const response = await axios.post(url, postData, { headers });
      if (response.status === 200) {
        setData(response.data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong");
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);

      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage categories={data} />} />
        <Route
          path="/blog/:slug"
          element={<BlogDetailPage categories={data} />}
        />
        <Route path="/blog" element={<BlogPage categories={data} />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments/:id" element={<Comments />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />

          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
