import { Link } from "react-router-dom";
import { useAuth } from "../context/Authprovider";

function Blog() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">✨ All Blogs ✨</h1>
      

      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {blogs.map((element) => (
            <Link
              key={element._id}
              to={`/blog/${element._id}`}
              className="relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white"
            >
              {/* Blog Image */}
              <img
                src={element?.blogImage?.url}
                alt={element?.title}
                className="w-full h-56 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>

              {/* Text Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-lg font-semibold truncate">{element?.title}</h2>
                <p className="text-sm opacity-90">{element?.category}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No Blogs Found
        </p>
      )}
    </div>
  );
}

export default Blog;
