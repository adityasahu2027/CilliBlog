import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://cilliblog-backend-server.onrender.com/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setBlog(data);
      } catch (error) {
        console.error(error);
        toast.error("Please sign in to view the blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading blog...</p>;
  if (!blog)
    return <p className="text-center mt-10 text-gray-600">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
      {/* Blog Image */}
      <img
        src={blog.blogImage?.url}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      {/* Blog Details */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <p className="font-semibold w-24 text-gray-700">Title:</p>
          <p className="text-gray-800">{blog.title}</p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <p className="font-semibold w-24 text-gray-700">Category:</p>
          <p className="text-blue-600">{blog.category}</p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <p className="font-semibold w-24 text-gray-700">About:</p>
          <p className="text-gray-700">{blog.about}</p>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <img
            src={blog.adminPhoto}
            alt={blog.adminName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">Author:</p>
            <p className="text-gray-600">{blog.adminName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
