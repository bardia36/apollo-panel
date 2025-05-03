import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./stores/auth-store";

export default function PublicRoutes() {
  const { auth } = useAuthStore();

  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
}
