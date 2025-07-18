import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";

const SignupSchema = Yup.object().shape({
  title: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Title is required"),
  body: Yup.string().required("Body is required"),
  author: Yup.string().required("Author is required"),
  image: Yup.string().url("Must be a valid URL").nullable(),
});

const Create = () => {
  const user = useRecoilValue(userAtom);
  const redir = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn || user.data.role !== "admin") {
      redir("/login");
    }
  }, [user, redir]);

  const notify = () =>
    toast.success("Blog Created Successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">Create Blog</h1>

        <Formik
          initialValues={{ title: "", body: "", author: "", image: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            axios
              .post("http://localhost:8000/Blogs/", values)
              .then(() => {
                notify();
                resetForm();
                setSubmitting(false);
                setTimeout(() => {
                  redir("/blogs");
                }, 3000);
              })
              .catch((err) => {
                console.error(err);
                setSubmitting(false);
              });
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                  Title
                </label>
                <Field
                  name="title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.title && touched.title && (
                  <div className="text-red-600 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-gray-700 font-medium mb-1">
                  Author
                </label>
                <Field
                  name="author"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.author && touched.author && (
                  <div className="text-red-600 text-sm mt-1">{errors.author}</div>
                )}
              </div>

              {/* Image */}
              <div>
                <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
                  Image URL (optional)
                </label>
                <Field
                  name="image"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.image && touched.image && (
                  <div className="text-red-600 text-sm mt-1">{errors.image}</div>
                )}
              </div>

              {/* Body */}
              <div>
                <label htmlFor="body" className="block text-gray-700 font-medium mb-1">
                  Body
                </label>
                <Field
                  as="textarea"
                  name="body"
                  rows="6"
                  className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.body && touched.body && (
                  <div className="text-red-600 text-sm mt-1">{errors.body}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-semibold py-2 px-4 rounded-md transition-all ${
                  isSubmitting
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Create;
