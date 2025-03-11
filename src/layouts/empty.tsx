import { Outlet } from "react-router-dom";

export default function EmptyLayout() {
  return (
    <div className="h-dvh overflow-hidden">
      <Outlet />
    </div>
  );
}
