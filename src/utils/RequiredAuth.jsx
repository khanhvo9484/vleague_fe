import { useLocation, Outlet, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return allowedRoles.includes(auth?.role ? auth.role : "") ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace></Navigate>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
export default RequiredAuth;
