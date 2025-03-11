import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  let auth = { token: false };

  return auth.token ? <Navigate to="/dashboard" /> : <Outlet />;
}
