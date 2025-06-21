import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PiEyeLight, PiEyeSlashThin } from "react-icons/pi";
import axios from "axios";
//toast step 1
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/user";
import { useRecoilState } from "recoil";

const SignupSchema = Yup.object().shape({
  
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required()
    .matches(/(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  let[user,setUser]=useRecoilState(userAtom);
  let [toggle, setToggle] = useState(false);
  let redir = useNavigate();
  // toast step 3
  const notify = () =>
    toast.success("Logged in Successfully!", {
      // onClose: () => redir('/blogs'),
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
  const notify2 = () =>
    toast.error("Wrong email or password!", {
      // onClose: () => redir('/blogs'),
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
    

  return (
    <div className="items-center mx-auto rounded p-3 mt-4 mb-4 flex flex-col justify-center w-[50%] shadow-lg">
      <h1 className="font-bold text-purple-700 text-3xl">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          //console.log(values);
          axios
            .get("http://localhost:8000/users/" + values.email)
            .then((reps) => {
              redir("/blogs");

              console.log(reps.data);
              if(reps.data.password===values.password){
                setUser({isLoggedIn:true,data:{email:values.email, fullname: values.fullname, role:reps.data.role}})
                notify();
                setTimeout(() => {
                  redir("/blogs");
                }, 3000);
              }else{
                notify2()
              }

              
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex items-center justify-center flex-col gap-2">
            <fieldset className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="password">Password</label>
              <div className="flex items-start justify-start flex-row gap-2">
                <Field
                  className="border-2 rounded py-2 px-4"
                  id="password"
                  type={toggle ? "text" : `password`}
                  name="password"
                  placeholder="Strong Password"
                />

                {toggle ? (
                  <PiEyeLight onClick={() => setToggle((prev) => !prev)} />
                ) : (
                  <PiEyeSlashThin onClick={() => setToggle((prev) => !prev)} />
                )}
              </div>
            </fieldset>
            {errors.password && touched.password ? (
              <div className="text-red-600 text-[12px]">{errors.password}</div>
            ) : null}
            <fieldset className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="email">Email</label>
              <Field
                className="border-2 rounded py-2 px-4"
                id="email"
                name="email"
                type="email"
                placeholder="atodo@gmail.com"
              />
            </fieldset>
            {errors.email && touched.email ? (
              <div className="text-red-600 text-[12px]">{errors.email}</div>
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
      <p>
        Don't have an Account?{" "}
        <button onClick={() => redir("/signup")} className="font-semibold mt-3">
          Signup
        </button>
      </p>
      {/* Toast step 2*/}
      <ToastContainer />
    </div>
  );
};
export default Login;
