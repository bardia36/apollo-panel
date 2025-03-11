import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import EmptyLayout from "@/layouts/empty";

// Pages
import DashboardPage from "@/pages/dashboard";
import LoginPage from "@/pages/login";

// Navigation
import PrivateRoutes from "./private-route";
import PublicRoutes from "./public-route";

// Components
import Page404 from "@/components/shared/page-404";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route element={<AuthLayout />}>
          <Route element={<LoginPage />} path="/login" />
        </Route>
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<DefaultLayout />}>
          <Route element={<DashboardPage />} path="/dashboard" />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<EmptyLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
