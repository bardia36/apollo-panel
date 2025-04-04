import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./stores/authStore";

export default function PrivateRoutes() {
  const { auth } = useAuthStore();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
