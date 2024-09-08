import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return;
  }

  if (!isAuthenticated) {
    return <Navigate to="/authenticate" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
