import React, { useEffect, useState } from "react";
import axios from "axios";


function Creators() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const { data } = await axios.get(
        "https://cilliblog-4.onrender.com/api/users/admins",
        {
          withCredentials: true,
        }
      );
      console.log(data.admins);
      setAdmin(data.admins);
    };
    fetchAdmin();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 5).map((element) => (
            <div key={element._id} className="flex flex-col items-center">
             
                {/* Image Always Circle */}
                <img
                  src={element?.photo?.url}
                  alt="Photo"
                  className="w-32 h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 object-cover rounded-full border-2 border-gray-300 shadow-md text-center"
                />

                
                <div className="text-center mt-3">
                  <p className="text-lg font-medium">{element.name}</p>
                  <p className="text-gray-600 text-sm">{element.role}</p>
                </div>
              
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No Creators Found
          </p>
        )}
      </div>
    </div>
  );
}

export default Creators;
