import { Navigate, Outlet, useLocation } from "react-router";
import { useStore } from "../../store/store";

const ProtectedRoute = ({
  redirectPath = "/login",
}: {
  redirectPath?: string;
}) => {
  const location = useLocation();
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (user && !user.hasPlaidConnection && location.pathname !== "/connect") {
    return <Navigate to="/connect" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
