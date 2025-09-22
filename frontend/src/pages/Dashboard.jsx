
import { useAuth } from "../context/Authprovider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MYprofile";
import MyBlog from "../dashboard/MyBlog";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const { profile, isAuthenticated,loading } = useAuth();
  const [component, setComponent] = useState("My Blog");
  console.log(profile);
  console.log(isAuthenticated);
   if (loading) {
    return <h2>Loading...</h2>; // ⏳ jab tak profile check ho raha hai
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        <Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "My Blog" ? (
          <MyBlog />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlog />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
