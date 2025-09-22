import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "https://cilliblog-5.onrender.com/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
      // Redirect to dashboard after successful blog creation
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Please fill all required fields");
    }
  };

  return (
    <div className="sm:ml-64 min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-10 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
          ✍️ Create <span className="text-blue-600">Blog</span>
        </h3>

        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Category</label>
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

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Blog Image</label>
            <div className="flex items-center justify-center mb-3">
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Preview"
                className="w-full max-w-md h-64 rounded-xl object-cover shadow-md border border-gray-200"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              rows="6"
              placeholder="Write something about your blog..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-200"
          >
            🚀 Post Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
