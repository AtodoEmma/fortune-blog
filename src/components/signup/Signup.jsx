import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Validation schema
const SignupSchema = Yup.object().shape({
  fullname: Yup.string().min(3, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (values, actions) => {
    try {
      // 1. Get all existing users from your MockAPI
      const res = await axios.get(
        "https://687c050bb4bc7cfbda87fb75.mockapi.io/users"
      );

      // 2. Check if the email already exists
      const emailExists = res.data.some((user) => user.email === values.email);
      if (emailExists) {
        toast.error("Email already exists");
        return;
      }

      // 3. Create new user
      await axios.post("https://687c050bb4bc7cfbda87fb75.mockapi.io/users", {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        role: "user",
      });

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed");
      console.error("Signup error:", error);
    } finally {
      actions.setSubmitting(false); // Re-enable the submit button
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow border rounded">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Create an Account</h2>

      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="fullname"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              {errors.fullname && touched.fullname && (
                <div className="text-red-500 text-sm">{errors.fullname}</div>
              )}
            </div>
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
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>
            <div>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-2 text-white rounded ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
