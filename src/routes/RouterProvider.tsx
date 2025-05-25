import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "@/components/shared/loading";
import { publicRoutes, privateRoutes, commonRoutes } from "./config";

export const RouterProvider = () => {
  const routes = [...publicRoutes, ...privateRoutes, ...commonRoutes];
  const element = useRoutes(routes);

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};
