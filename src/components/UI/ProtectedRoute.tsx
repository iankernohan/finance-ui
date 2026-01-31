import { Navigate, Outlet } from "react-router";
import { useStore } from "../../store/store";

const ProtectedRoute = ({
  redirectPath = "/login",
}: {
  redirectPath?: string;
}) => {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
