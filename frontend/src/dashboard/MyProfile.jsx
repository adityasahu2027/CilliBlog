import axios from "axios";
import { useEffect, useState } from "react";
import { Mail, Phone, GraduationCap, Shield, Calendar } from "lucide-react";

function MyProfile() {
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://cilliblog-4.onrender.com/api/users/my-profile",
          { withCredentials: true }
        );
        console.log(data);
        setMyProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProfile();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading profile...</p>;
  if (!myProfile)
    return <p className="text-center mt-10 text-lg">Profile not found.</p>;

  const user = myProfile.user;

  return (
    <div className="flex justify-center items-start p-6 min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-lg transform transition hover:scale-[1.02] hover:shadow-2xl">
        {/* Cover Photo */}
        <div className="relative">
          <img
            src={user.photo?.url}
            alt="cover"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
            <img
              src={user.photo?.url}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 pt-20 pb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-indigo-600 font-medium text-lg">{user.role}</p>

          {/* Details */}
          <div className="mt-6 space-y-4 text-gray-700 text-sm">
            <p className="flex items-center justify-center gap-2">
              <Mail size={18} className="text-indigo-500" />
              {user.email}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone size={18} className="text-green-500" />
              {user.phone}
            </p>
            <p className="flex items-center justify-center gap-2">
              <GraduationCap size={18} className="text-blue-500" />
              {user.education}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Shield size={18} className="text-purple-500" />
              Role: {user.role}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Calendar size={18} className="text-red-500" />
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
