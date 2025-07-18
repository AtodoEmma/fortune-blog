import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { userAtom } from "./atoms/user";

const Home = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (user?.isLoggedIn) {
      navigate("/blogs");
    } else {
      // Redirect to login or signup
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center"
        >
          <motion.h1
            className="text-4xl font-bold text-purple-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to JustFOOD
          </motion.h1>

          <motion.p
            className="text-gray-700 mb-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover delicious recipes, cooking tips, and food stories from
            around the world.
          </motion.p>

          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleExploreClick}
              className="bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Explore Blogs
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/about"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
