import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UpdateSchema = Yup.object().shape({
  title: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Title is required"),
  body: Yup.string().required("Body is required"),
  author: Yup.string().required("Author is required"),
});

const Update = () => {
  const [post, setPost] = useState(null);
  const redir = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`https://687c050bb4bc7cfbda87fb75.mockapi.io/Blogs/${slug}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error loading blog:", err));
  }, [slug]);

  const handleSuccess = () => {
    toast.success("Blog Updated Successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });

    // Redirect after 3 seconds (same as toast duration)
    setTimeout(() => {
      redir("/blogs");
    }, 3000);
  };

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">Update Blog</h1>

        <Formik
          initialValues={{
            title: post.title || "",
            body: post.body || "",
            author: post.author || "",
          }}
          validationSchema={UpdateSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .patch(
                `https://687c050bb4bc7cfbda87fb75.mockapi.io/Blogs/${slug}`,
                values
              )
              .then(() => {
                handleSuccess();
                setSubmitting(false);
              })
              .catch((err) => {
                console.error("Update failed:", err);
                setSubmitting(false);
              });
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                <Field
                  name="title"
                  placeholder="Enter blog title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.title && touched.title && (
                  <div className="text-red-600 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              <div>
                <label htmlFor="author" className="block text-gray-700 font-medium mb-1">Author</label>
                <Field
                  name="author"
                  placeholder="Author name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.author && touched.author && (
                  <div className="text-red-600 text-sm mt-1">{errors.author}</div>
                )}
              </div>

              <div>
                <label htmlFor="body" className="block text-gray-700 font-medium mb-1">Body</label>
                <Field
                  as="textarea"
                  name="body"
                  rows={6}
                  placeholder="Write your blog content..."
                  className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.body && touched.body && (
                  <div className="text-red-600 text-sm mt-1">{errors.body}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-semibold py-2 px-4 rounded-md transition-all ${
                  isSubmitting ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Update;
