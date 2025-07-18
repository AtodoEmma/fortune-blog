import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import AlertMui from "../mui/AlertMui";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import html2canvas from "html2canvas";

const Details = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const redir = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useRecoilValue(userAtom);
  const detailsRef = useRef(null);

  const notify = () =>
    toast.success("Blog Deleted Successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });

  const takeScreenshot = () => {
    if (detailsRef.current) {
      html2canvas(detailsRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `blog-${id}-details.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/Blogs/" + id)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

    return () => {
      recognition.stop();
    };
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/Blogs/" + id)
      .then(() => {
        notify();
        setTimeout(() => {
          redir(-1);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div
        ref={detailsRef}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        {blog && (
          <>
            <h1 className="text-3xl font-bold text-purple-800 mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {blog.body}
            </p>
          </>
        )}

        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            title="Go Back"
            onClick={() => redir(-1)}
            className="text-gray-600 hover:text-black text-2xl"
          >
            <MdKeyboardBackspace />
          </button>

          {user.data.role === "admin" && (
            <>
              <button
                title="Delete This Blog"
                onClick={() => setOpen(true)}
                className="text-red-600 hover:text-white hover:bg-red-600 px-3 py-2 rounded transition"
              >
                <RiDeleteBin2Line size={24} />
              </button>

              <button
                onClick={() => redir("/update/" + id)}
                title="Update This Blog"
                className="text-green-600 hover:text-white hover:bg-green-600 px-3 py-2 rounded transition"
              >
                <GrUpdate size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
      <AlertMui open={open} setOpen={setOpen} action={handleDelete} id={id} />
    </div>
  );
};

export default Details;
