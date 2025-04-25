// Modules
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTheme } from "@heroui/use-theme";

// Layouts
import DefaultLayout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import EmptyLayout from "@/layouts/empty";

// Pages
// Pages - Public
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ForgetPasswordPage from "@/pages/forget-password";
import ResetPasswordPage from "@/pages/reset-password";
// Pages - Private
import DashboardPage from "@/pages/dashboard";
import ExpertRequestsPage from "./pages/expert-requests";

// Components
import Page404 from "@/components/shared/page-404";
import Loading from "@/components/shared/loading";

// Navigation
import PrivateRoutes from "./private-route";
import PublicRoutes from "./public-route";

// Stores
import useAuthStore from "@/stores/authStore";

// Contexts
import { BreadcrumbProvider } from "@/context/breadcrumbContext";

// Types
import type { ActhDto } from "./types/auth";

type CookieValues = {
  AUTH?: ActhDto;
};

function App() {
  const [cookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [initializing, setInitializing] = useState(true);
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    setAccount();
  }, []);

  async function setAccount() {
    detectBrowserTheme();
    setAuth(cookie.AUTH);
    setInitializing(false);
  }

  function detectBrowserTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      setTheme("dark");
    else setTheme("light");
  }

  return (
    <>
      {initializing ? (
        <Loading />
      ) : (
        <div className="text-foreground bg-background">
          <BreadcrumbProvider>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route element={<AuthLayout />}>
                  <Route element={<LoginPage />} path="/login" />
                  <Route element={<SignupPage />} path="/signup" />
                  <Route
                    element={<ForgetPasswordPage />}
                    path="/forget-password"
                  />
                  <Route
                    element={<ResetPasswordPage />}
                    path="/reset-password"
                  />
                </Route>
              </Route>

              <Route element={<PrivateRoutes />}>
                <Route element={<DefaultLayout />}>
                  <Route element={<DashboardPage />} path="/dashboard" />
                  <Route
                    element={<ExpertRequestsPage />}
                    path="/expert-requests"
                  />
                </Route>
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route element={<EmptyLayout />}>
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
          </BreadcrumbProvider>
        </div>
      )}
    </>
  );
}

export default App;
