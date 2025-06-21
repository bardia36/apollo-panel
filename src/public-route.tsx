import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./stores/auth-store";
import useWorkspaceStore from "./stores/workspace-store";

export default function PublicRoutes() {
  const { auth } = useAuthStore();
  const { workspaceSlug } = useWorkspaceStore();

  return auth ? <Navigate to={`/${workspaceSlug}/dashboard`} /> : <Outlet />;
}
