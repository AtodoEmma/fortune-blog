import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PiEyeLight, PiEyeSlashThin } from "react-icons/pi";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/user";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Required")
    .matches(/(?=.*[a-z])/, "Must contain a lowercase letter")
    .matches(/(?=.*[A-Z])/, "Must contain an uppercase letter")
    .matches(/(?=.*[0-9])/, "Must contain a number")
    .matches(/(?=.*[!@#$%^&*])/, "Must contain a special character"),
});

const Login = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Logged in successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });

  const notifyError = () =>
    toast.error("Wrong email or password!", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow border rounded">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-[90%] md:w-[50%] p-6 rounded shadow-lg bg-white flex flex-col items-center">
          <h1 className="text-2xl font-bold text-purple-700 mb-4">Login</h1>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              setLoading(true);
              axios
                .get(
                  `http://localhost:8000/users?email=${encodeURIComponent(
                    values.email
                  )}`
                )
                .then((res) => {
                  const userFromDB = res.data[0];
                  if (userFromDB && userFromDB.password === values.password) {
                    const loggedInUser = {
                      isLoggedIn: true,
                      data: {
                        email: userFromDB.email,
                        fullname: userFromDB.fullname,
                        role: userFromDB.role,
                      },
                    };
                    setUser(loggedInUser);
                    localStorage.setItem("user", JSON.stringify(loggedInUser));
                    notifySuccess();
                    setTimeout(() => navigate("/blogs"), 2000);
                  } else {
                    notifyError();
                  }
                })
                .catch(() => {
                  notifyError();
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. user@example.com"
                    className="border-1 rounded px-4 py-2"
                  />
                  {errors.email && touched.email && (
                    <span className="text-red-600 text-sm">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={toggle ? "text" : "password"}
                      placeholder="Enter strong password"
                      className="border-1 rounded px-4 py-2 w-full pr-10"
                    />
                    <span
                      onClick={() => setToggle(!toggle)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-700"
                    >
                      {toggle ? (
                        <PiEyeSlashThin size={20} />
                      ) : (
                        <PiEyeLight size={20} />
                      )}
                    </span>
                  </div>
                  {errors.password && touched.password && (
                    <span className="text-red-600 text-sm">
                      {errors.password}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white rounded py-2 transition`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center mt-2">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-purple-600 font-semibold"
                  >
                    Sign up
                  </button>
                </p>
              </Form>
            )}
          </Formik>
          <ToastContainer />
        </div>
      </main>
    </div>
  );
};

export default Login;
