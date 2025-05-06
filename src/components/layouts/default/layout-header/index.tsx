import { lazy } from "react";

const MobileHeader = lazy(() => import("./mobile-header.tsx"));
const DesktopHeader = lazy(() => import("./desktop-header.tsx"));

export default function LayoutHeader() {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
    </>
  );
}
