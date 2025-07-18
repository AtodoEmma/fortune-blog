import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/user";
import { toast } from "react-toastify";

const Nav = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userAtom"); // Clear persistent storage
    setUser({ isLoggedIn: false, data: {} }); // Update Recoil state immediately
    navigate("/"); // Redirect right away
    toast.success("Signed out successfully", {  
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    }); // Toast still works
};

 return (
    <nav className="bg-gray-800 px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-yellow-400 text-xl font-bold">
          JustFOOD
        </Link>

        <div className="flex space-x-4 text-sm text-white font-medium">
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
    </nav>
  );
};

export default Nav;
