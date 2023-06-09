import { useLocation, Outlet, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
export default RequiredAuth;
