
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

function Contact() {
  // valiation react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    // send data to web3forms
    const userinfo={
      access_key:"5c879940-4e71-4b9e-b275-1c6859807a0d",
      name:data.username,
      email:data.email,
      message:data.message
    }
    try {
      await axios.post("https://api.web3forms.com/submit", userinfo);
      toast.success("Message sent successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-6">📩 Send a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("username", { required: true })}
              />
               {errors.username && <span className="text-sm text-red-600 font-semibold">This field is required</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: true })}
              />
               {errors.email && <span className="text-sm text-red-600 font-semibold">This field is required</span>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 mb-2">Your Message</label>
              <textarea
              name="message"
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("message", { required: true })}
              >
              </textarea>
               {errors.message && <span className="text-sm text-red-600 font-semibold">This field is required</span>}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right - Contact Info */}
        <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            📞 Contact Information
          </h2>
          <p className="mb-4">
            Have questions, suggestions, or feedback? Reach out to us anytime —
            we’d love to hear from you.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white">Address</h3>
              <p>123 Blog Street, Knowledge City, India</p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Email</h3>
              <p>support@cilliblog.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Working Hours</h3>
              <p>Mon - Fri : 9:00 AM - 6:00 PM</p>
              <p>Sat : 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
