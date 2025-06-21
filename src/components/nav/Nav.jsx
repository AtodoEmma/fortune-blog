import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";


const Nav = () => {
 let [user, setUser]=useRecoilState(userAtom)
  
  return (
    <nav className="bg-gray-700 py-3 px-4">
      <ol className="flex items-center justify-between">
        <li>
          <Link className="text-white" to="">Logo
            
          </Link>
        </li>
        <li className="flex items-center justify-between gap-4">
          <Link className="text-white" to="/blogs">
            Blog
          </Link>
          {user.data.role === "admin" && (
            <Link className="text-white text-nowrap" to="/create">
              Create Blog
            </Link>
          )}
          {!user.isLoggedIn && (
            <>
              <Link className="text-white" to="/login">
                Login
              </Link>
              <Link className="text-white" to="/signup">
                Signup
              </Link>
            </>
          )}
          {user.isLoggedIn && (
            <Link
              onClick={() => setUser({ isLoggedIn: false, data: {} })}
              className="text-white"
              to="#"
            >
              Signout{" "}
            </Link>
          )}

          <Link className="text-white" to="/about">
            About
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Nav;
