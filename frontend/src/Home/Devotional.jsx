import { Link } from "react-router-dom";
import { useAuth } from "../context/Authprovider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter(
    (blog) => blog.category?.toLowerCase() === "devotional"
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">✨ Devotional ✨</h1>
      <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto">
        The concept of gods varies across different cultures, religions & belief
        systems.
      </p>

      <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} itemClass="px-3">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((element) => (
            <Link
              key={element._id}
              to={`/blog/${element._id}`}
              className="relative block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white"
            >
              {/* Blog Image */}
              <img
                src={element?.blogImage?.url || "/fallback.jpg"}
                alt={element?.title}
                className="w-full h-56 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>

              {/* Text Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-lg font-semibold truncate">
                  {element?.title}
                </h2>
                <p className="text-sm opacity-90">{element.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No Devotional Blogs Found
          </p>
        )}
      </Carousel>
    </div>
  );
}

export default Devotional;
