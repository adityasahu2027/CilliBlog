import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(data);

        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage);
        setBlogImagePreview(data?.blogImage.url); // image preview me bhi dikhe
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    fetchBlogDetails();
  }, [id]);

  // update blog function
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    // only append new image if user selected one
 if (blogImage instanceof File) {
  formData.append("blogImage", blogImage);
 }
    try {
      const { data } = await axios.put(
        `https://cilliblog-backend-server.onrender.com/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
        
        }
      );
      toast.success(data.message || "Blog updated successfully");
navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Update Blog
      </h2>

      <form onSubmit={handleUpdateBlog} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Category</option>
              <option value="Devotional">Devotional</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Music">Music</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fashion">Fashion</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Art">Art</option>
              <option value="Politics">Politics</option>
              <option value="Environment">Environment</option>
              <option value="Psychology">Psychology</option>
              <option value="Philosophy">Philosophy</option>
              
            </select>
        </div>

        {/* About */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">About</label>
          <textarea
            rows="5"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write something about the blog..."
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={changePhotoHandler}
            className="w-full"
          />
        </div>

        {/* Image Preview */}
        {blogImagePreview && (
          <div className="mt-3">
            <p className="text-gray-600 text-sm mb-2">Preview:</p>
            <img
              src={blogImagePreview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-md border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default UpdateBlog;
