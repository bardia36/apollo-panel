import { lazy } from "react";
import useIsMobile from "@/hook/useIsMobile";

const MobileHeader = lazy(() => import("./mobile-header.tsx"));
const DesktopHeader = lazy(() => import("./desktop-header.tsx"));

export default function LayoutHeader() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
