import { Suspense, useEffect } from "react";
import { useRoutes, useLocation, matchRoutes } from "react-router-dom";
import Loading from "@/components/shared/loading";
import { publicRoutes, privateRoutes, commonRoutes } from "./config";
import { t } from "i18next";

export const RouterProvider = () => {
  const routes = [...publicRoutes, ...privateRoutes, ...commonRoutes];
  const element = useRoutes(routes);

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export const RouteTitleHandler = () => {
  const location = useLocation();
  useEffect(() => {
    const allRoutes = [...publicRoutes, ...privateRoutes, ...commonRoutes];
    const matches = matchRoutes(allRoutes, location.pathname);
    let routeTitle = "";
    if (matches) {
      for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        if (match.route && match.route.title) {
          routeTitle =
            typeof match.route.title === "string" ? match.route.title : "";
          break;
        }
      }
    }
    document.title = routeTitle
      ? `${routeTitle} | ${t("title.apollo")}`
      : t("title.apollo");
  }, [location]);
  return null;
};
