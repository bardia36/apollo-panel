import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import useAuthStore from "@/stores/auth-store";

// Layouts
import DefaultLayout from "@/layouts/default";
import AuthLayout from "@/layouts/auth";
import EmptyLayout from "@/layouts/empty";
import { t } from "i18next";

// Guards
const AuthGuard = () => {
  const { auth } = useAuthStore();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

const GuestGuard = () => {
  const { auth } = useAuthStore();
  return auth ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const ForgetPasswordPage = lazy(() => import("@/pages/forget-password"));
const ResetPasswordPage = lazy(() => import("@/pages/reset-password"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const ExpertRequestsPage = lazy(() => import("@/pages/expert-requests"));
const Page404 = lazy(() => import("@/components/shared/page-404"));

export type AppRoute = RouteObject & {
  title?: string;
  breadcrumb?: string;
  children?: AppRoute[];
};

export const publicRoutes: AppRoute[] = [
  {
    element: <GuestGuard />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
            title: t("title.login"),
          },
          {
            path: "signup",
            element: <SignupPage />,
            title: t("title.signUp"),
          },
          {
            path: "forget-password",
            element: <ForgetPasswordPage />,
            title: t("title.forgetPassword"),
          },
          {
            path: "reset-password",
            element: <ResetPasswordPage />,
            title: t("title.resetPassword"),
          },
        ],
      },
    ],
  },
];

export const privateRoutes: AppRoute[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
            title: t("title.dashboard"),
            breadcrumb: "Dashboard",
          },
          {
            path: "expert-requests",
            element: <ExpertRequestsPage />,
            title: t("title.expertRequests"),
            breadcrumb: "Expert Requests",
          },
          {
            path: "",
            element: <Navigate to="/dashboard" replace />,
          },
        ],
      },
    ],
  },
];

export const commonRoutes: AppRoute[] = [
  {
    path: "*",
    element: <EmptyLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
        title: t("title.notFound"),
      },
    ],
  },
];
