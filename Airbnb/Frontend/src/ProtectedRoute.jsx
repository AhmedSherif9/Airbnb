import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-1/4 mx-auto">
        <ClipLoader color={"#123abc"} loading={true} size={150} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/authenticate" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
