import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
//toast step 1
import { Bounce, ToastContainer, toast } from "react-toastify";
import AlertMui from "../mui/AlertMui";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import UpdateDiagMui from "../update/Update";
import html2canvas from "html2canvas";

const Details = () => {
  let { id } = useParams();
  let [blog, setBlog] = useState(null);
  let redir = useNavigate();
  const [open, setOpen] = React.useState(false);
  let user= useRecoilValue(userAtom);

  const detailsRef = useRef();

  // toast step 3
  const notify = () => toast.success('Blog Deleted Successfully!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
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
      return () => recognition.stop();
    }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Blogs/" + id)
      .then((reps) => {
        console.log(reps.data);
        setBlog(reps.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // handleDelete function
  function handleDelete(id) {
   // let askUser = confirm("Do you want to delete this blog post FOREVER");
   
   
      axios
        .delete("http://localhost:8000/Blogs/" + id)
        .then((reps) => {
          console.log(reps);
          // toast step 4
          notify();
          setTimeout(() => {
            redir(-1);

          }, 3000);
          
        })
        .catch((err) => {
          console.log(err);
        });
      
    
  }

  return (
    <div className="bg-blue-50 bg-cover bg-center min-h-screen">
      <div
        ref={detailsRef}
        className="flex items-center justify-center flex-col gap-4"
      >
        {blog && (
          <>
            <h3 className="font-poppines font-bold text-3xl text-blue-700  mb-5 mt-5">
              {" "}
              {blog.title}{" "}
            </h3>
            <p className="font-poppines font-normal px-5 py-3 shadow-md text-[1rem] text-black mb-5">
              {" "}
              {blog.body}{" "}
            </p>
          </>
        )}

        <div className="flex justify-center items-center gap-4 flex-row mt-5 shadow-lg">
          <button
            title="Go Back"
            onClick={() => redir(-1)}
            className="outline outline-gray-300 py-2 px-4 hover:outline-none rounded-sm text-2xl"
          >
            <MdKeyboardBackspace />
          </button>
          {user.data.role === "admin" && (
            <>
              <button
                title="Delete This Blog"
                onClick={() => setOpen(true)}
                className="outline outline-gray-300 px py-2 px-4 hover:bg-red-500 hover:text-white rounded-sm text-2xl"
              >
                <RiDeleteBin2Line />
              </button>
              <button
                onClick={() => redir("/update/" + id)}
                title="Update This Blog"
                className="outline outline-gray-300 px py-2 px-4 hover:bg-green-500 hover:text-white rounded-sm text-2xl"
              >
                <GrUpdate />
              </button>{" "}
            </>
          )}
        </div>
        <button
          onClick={takeScreenshot}
          className="mt-4 bg-blue-600 text-white px-3 py-2 rounded"
        >
          Screenshot Blog Details
        </button>
      </div>

      {/* Toast step 2*/}
      <ToastContainer />
      <AlertMui open={open} setOpen={setOpen} action={handleDelete} id={id} />
      {/* <UpdateDiagMui /> */}
    </div>
  );
};

export default Details;
