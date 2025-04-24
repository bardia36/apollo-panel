import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layouts/default/sidebar/index";
import LayoutHeader from "@/components/layouts/default/layout-header";

export default function DefaultLayout() {
  return (
    <div className="flex items-center justify-start">
      <div className="flex h-screen w-full gap-4 overflow-hidden">
        <Sidebar />

        <main className="w-full flex-1 p-4">
          <LayoutHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
