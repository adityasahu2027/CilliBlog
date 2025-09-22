import React from "react";

function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Welcome to <span className="font-semibold">CilliBlog</span> – a digital
        space where knowledge meets creativity. Our goal is to share ideas,
        insights, and trends that matter in today’s fast-changing world.
      </p>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Website Info */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">🌐 Website Information</h2>
          <p className="text-gray-700 leading-6">
            CilliBlog is a platform for writers, creators, and learners to
            collaborate and share meaningful content. Whether you’re here to
            read, write, or explore, we provide a simple and engaging
            experience.
          </p>
        </div>

        {/* Content Trends */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">📈 Content Trends</h2>
          <p className="text-gray-700 leading-6">
            We focus on trending topics such as technology, lifestyle, health,
            education, spirituality, and personal growth. Our content is crafted
            to keep you updated, informed, and inspired.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-6">
            Our mission is to build a community-driven platform where every
            voice matters. We aim to promote creativity, curiosity, and
            meaningful discussions.
          </p>
        </div>

        {/* Join Community */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-3">🤝 Join Our Community</h2>
          <p className="text-gray-700 leading-6">
            Become part of our growing family of creators and readers. Share
            your thoughts, explore new ideas, and connect with like-minded
            people from around the globe.
          </p>
        </div>
      </div>

      {/* Extra Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-3">✨ Why Choose CilliBlog?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-7">
          We offer a clean reading experience, a platform to express your
          creativity, and an opportunity to stay ahead with the latest trends.
          CilliBlog isn’t just a website – it’s a community where ideas turn into
          impact.
        </p>
      </div>
    </div>
  );
}

export default About;
