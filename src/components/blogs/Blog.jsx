import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import html2canvas from "html2canvas";

const Blog = () => {
  const [blogs, setBlogs] = useState(null);
  const redir = useNavigate();
  const user = useRecoilValue(userAtom);
  const blogRef = useRef();

  const takeScreenshot = () => {
    if (blogRef.current) {
      html2canvas(blogRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "blog-list-screenshot.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (transcript.includes("screenshot")) {
        takeScreenshot();
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      redir("/login");
    }
    axios
      .get("http://localhost:8000/Blogs")
      .then((resp) => setBlogs(resp.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="Blog" className="bg-white min-h-screen py-10">
      <h1 className="font-bold text-3xl text-center text-purple-700 mb-8">
        Latest Blog
      </h1>

      <div
        ref={blogRef}
        className="w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {blogs &&
          blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => redir("/blog/" + blog.id)}
              className="bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:scale-105 transition-all duration-300 border border-purple-200"
            >
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {blog.content?.slice(0, 100)}...
              </p>
              <p className="text-xs text-gray-400 italic">
                {blog.author ? `By ${blog.author}` : "Unknown Author"} |{" "}
                {blog.date
                  ? new Date(blog.date).toLocaleDateString()
                  : "No Date"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
