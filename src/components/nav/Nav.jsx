import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/user";
import { toast, Bounce } from "react-toastify";
import { HiMenu, HiX } from "react-icons/hi"; // Menu icons

const Nav = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userAtom");
    setUser({ isLoggedIn: false, data: {} });
    navigate("/");
    toast.success("Signed out successfully", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 shadow-md px-4 py-3">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-yellow-400 text-xl font-bold">
          JustFOOD
        </Link>

        {/* Hamburger for small screens */}
        <div className="md:hidden text-white text-2xl" onClick={toggleMenu}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 text-sm text-white font-medium">
          <Link to="/blogs" className="hover:text-yellow-300">
            Blog
          </Link>

          {user?.data?.role === "admin" && (
            <Link to="/create" className="hover:text-yellow-300">
              Create Blog
            </Link>
          )}

          {!user?.isLoggedIn && (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-yellow-300">
                Signup
              </Link>
            </>
          )}

          {user?.isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition-colors duration-200"
            >
              Signout
            </button>
          )}

          <Link to="/about" className="hover:text-yellow-300">
            About
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2 text-sm text-white font-medium">
          <Link
            to="/blogs"
            className="hover:text-yellow-300"
            onClick={toggleMenu}
          >
            Blog
          </Link>

          {user?.data?.role === "admin" && (
            <Link
              to="/create"
              className="hover:text-yellow-300"
              onClick={toggleMenu}
            >
              Create Blog
            </Link>
          )}

          {!user?.isLoggedIn && (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-300"
                onClick={toggleMenu}
              >
                Signup
              </Link>
            </>
          )}

          {user?.isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="hover:text-red-400 transition-colors duration-200 text-left"
            >
              Signout
            </button>
          )}

          <Link
            to="/about"
            className="hover:text-yellow-300"
            onClick={toggleMenu}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
