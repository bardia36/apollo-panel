import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./stores/auth-store";

export default function PrivateRoutes() {
  const { auth } = useAuthStore();

  // return auth ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
}
