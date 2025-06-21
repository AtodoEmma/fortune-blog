import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import html2canvas from "html2canvas";

const Blog = () => {
  let [blogs, setBlogs] = useState(null);
  let redir = useNavigate();
  let user = useRecoilValue(userAtom);
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
      console.log("Voice heard:", transcript);
      if (transcript.includes("screenshot")) {
        takeScreenshot();
      }
    };

    recognition.start();
    return () => recognition.stop(); // Cleanup on unmount
  }, []);

  // fetch blogs data from API
  useEffect(() => {
    if(!user.isLoggedIn) {
      redir('/login')
    }
    axios
      .get("http://localhost:8000/Blogs")
      .then((resp) => {
        //console.log(resp.data);
        setBlogs(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    
      <div id="Blog" className="bg-white">
        <h1 className="font-poppines font-bold text-3xl mb-5"> Latest Blog </h1>
        <div
          ref={blogRef}
          className="w-[70%] mx-auto shadow flex flex-col items-center justify-center gap-4 py-3 px-4"
        >
          {blogs &&
            blogs.map((blog) => (
              <div
                onClick={() => redir("/blog/" + blog.id)}
                key={blog.id}
                className="odd:bg-gray even:bg-transparent text-black hover:bg-purple-400 shadow-md py-4 px-3"
              >
                <h3 className="text-center">{blog.title} </h3>
              </div>
            ))}
        </div>
      </div>
    
  );
};

export default Blog;
