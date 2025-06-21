import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
//toast step 1
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!"),
  body: Yup.string(),
  author: Yup.string()
});

const Update = () => {
  let [toggle, setToggle] = useState(false);
  let [post, setPost] =useState(null)
  let redir = useNavigate();
  let {slug}= useParams()
  // toast step 3
  const notify = () =>
    toast.success("Blog Updated Successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    useEffect(()=> {
      axios.get("http://localhost:8000/Blogs/" + slug)
        .then((reps) => {
          console.log(reps.data);
          setPost(reps.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },[])

  return (
    <div className="items-center mx-auto rounded p-3 mt-4 mb-4 flex flex-col justify-center w-[50%] shadow-lg">
      <h1 className="font-bold text-purple-700 text-3xl">Update</h1>
      {post && (
        <Formik
          initialValues={{
            title: post ? post.title : "",
            body: post ? post.body : "",
            author: post ? post.author : "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            //console.log(values);

            axios
              .patch("http://localhost:8000/Blogs/"+ slug, values)
              .then((reps) => {
                redir("/blogs");

                console.log(reps.data);

                notify();
                setTimeout(() => {
                  redir("/blogs");
                }, 3000);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {({ errors, touched, values }) => (
            <Form className="flex items-center justify-center flex-col gap-2">
              <fieldset className="flex flex-col items-start justify-start gap-2">
                <label htmlFor="title">Title</label>
                <Field
                  values={values.title}
                  className="border-2 rounded py-2 px-4"
                  id="title"
                  name="title"
                />
              </fieldset>

              {errors.title && touched.title ? (
                <div className="text-red-600 text-[12px]">{errors.title}</div>
              ) : null}
              <fieldset className="flex flex-col items-start justify-start gap-2">
                <label htmlFor="author">Author</label>
                <Field
                  values={values.author}
                  className="border-2 rounded py-2 px-4"
                  id="author"
                  type="text"
                  name="author"
                />
              </fieldset>
              {errors.author && touched.author ? (
                <div className="text-red-600 text-[12px]">{errors.author}</div>
              ) : null}
              <fieldset className="flex flex-col items-start justify-start gap-2">
                <label htmlFor="body">Body</label>
                <Field as="textarea"
                  values={values.body}
                  className="border-2 rounded py-2 px-4 min-h-[20vh] text-wrap"
                  id="body"
                  name="body"
                  type="text"
                />
              </fieldset>
              {errors.body && touched.body ? (
                <div className="text-red-600 text-[12px]">{errors.body}</div>
              ) : null}

              <button
                className="border-2 py-2 px-4 rounded hover:text-white hover:bg-green-600"
                type="submit"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Toast step 2*/}
      <ToastContainer />
    </div>
  );
};
export default Update;
