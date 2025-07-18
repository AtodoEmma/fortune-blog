import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { userAtom } from "../components/atoms/user";


const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userAtom);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
