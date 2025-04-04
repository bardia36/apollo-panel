import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./stores/authStore";

export default function PublicRoutes() {
  const { auth } = useAuthStore();

  return auth ? <Navigate to="/dashboard" /> : <Outlet />;
}
