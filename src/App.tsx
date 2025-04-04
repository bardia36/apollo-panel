import type { ActhDto } from "./types/auth";
type CookieValues = {
  AUTH?: ActhDto;
};

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

// Layouts
import DefaultLayout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import EmptyLayout from "@/layouts/empty";

// Pages
import DashboardPage from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import SignupPage from '@/pages/signup'
import ForgetPasswordPage from '@/pages/forget-password'

// Navigation
import PrivateRoutes from "./private-route";
import PublicRoutes from "./public-route";

// Components
import Page404 from "@/components/shared/page-404";
import Loading from "@/components/shared/loading";

function App() {
  const [cookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [initializing, setInitializing] = useState(true);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    setAccount();
  }, []);

  async function setAccount() {
    setAuth(cookie.AUTH);
    setInitializing(false);
  }

  return (
    <>
      {initializing ? (
        <Loading />
      ) : (
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<AuthLayout />}>
              <Route element={<LoginPage />} path="/login" />
              <Route element={<SignupPage />} path="/signup" />
              <Route element={<ForgetPasswordPage />} path="/forget-password" />
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
      )}
    </>
  );
}

export default App;
