import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import About from "./components/about/About";

import Blog from "./components/blogs/Blog";
import Details from "./components/details/Details";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Update from "./components/update/Update";
import Create from "./components/create/Create";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:slug" element={<Update />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
