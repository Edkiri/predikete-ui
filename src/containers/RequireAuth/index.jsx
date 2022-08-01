import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Context } from "@context/AppContext";

export const RequireAuth = ({ children }) => {
  const { user } = useContext(Context);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
