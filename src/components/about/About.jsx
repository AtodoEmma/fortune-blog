import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">
          About Us
        </h1>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Welcome to our food blog — your number one source for mouth-watering
          recipes, practical cooking tips, and tasty food inspiration. We’re
          passionate about bringing you easy-to-follow dishes that anyone can
          make, whether you’re a beginner or a kitchen pro.
        </p>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Our goal is to celebrate food in all its diversity — from local
          flavors to international favorites. We aim to create a space where
          food lovers like you can explore, cook, and share unforgettable
          moments around the table.
        </p>

        <div className="mt-10 border-t pt-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">
            Meet the Author
          </h2>
          <p className="text-gray-600 text-base">
            Hi, I'm Atodo Emmanuel Ojochenemi, a passionate food enthusiast and
            the mind behind this blog. I created this space to share my love for
            good food, creative recipes, and culinary exploration. I hope you
            enjoy the journey as much as I do.
          </p>
        </div>

        <div className="mt-10 border-t pt-8 text-center">
          <p className="text-gray-500">
            📧 Reach out anytime:{" "}
            <a
              href="mailto:atodofortune@email.com"
              className="text-blue-600 underline hover:text-blue-800"
            >
              atodofortune@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
