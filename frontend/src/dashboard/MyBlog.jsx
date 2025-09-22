import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MyBlog() {
  const [myBlogs, setMyblogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://cilliblog-5.onrender.com/api/blogs/my-blogs",
          { withCredentials: true }
        );
        setMyblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cilliblog-5.onrender.com/api/blogs/delete/${id}`, {
        withCredentials: true,
      });
      setMyblogs(myBlogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const openBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  const updateBlog = (id) => {
    navigate(`/blog/update/${id}`);
  };

  return (
    <div className="sm:ml-64 min-h-screen bg-gray-100">
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Blogs
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                key={element._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Blog Image */}
                {element?.blogImage && (
                  <img
                    src={element?.blogImage.url}
                    alt="blogImg"
                    className="w-full h-56 object-cover"
                    onClick={() => openBlog(element._id)}
                  />
                )}

                {/* Blog Content */}
                <div className="p-5" onClick={() => openBlog(element._id)}>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold text-gray-800 mt-2 line-clamp-2">
                    {element.title}
                  </h4>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between p-5">
                  <button
                    onClick={() => updateBlog(element._id)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                  >
                    UPDATE
                  </button>
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-lg">
              You have not posted any blog yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlog;
