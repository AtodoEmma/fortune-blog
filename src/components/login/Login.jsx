import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PiEyeLight, PiEyeSlashThin } from "react-icons/pi";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/user";

// Validation schema
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
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Login</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          setLoading(true);
          axios
            .get(
              `https://687c050bb4bc7cfbda87fb75.mockapi.io/users?email=${encodeURIComponent(
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
                setTimeout(() => navigate("/blogs"), 1000);
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
          <Form className="space-y-4">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div>
              <div className="relative">
                <Field
                  name="password"
                  type={toggle ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-2 border rounded pr-10"
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
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 text-white rounded ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-purple-600 font-semibold"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </p>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default Login;
