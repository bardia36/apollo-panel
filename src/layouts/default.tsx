import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layouts/default/sidebar/index";
import LayoutHeader from "@/components/layouts/default/layout-header";

export default function DefaultLayout() {
  return (
    <div className="flex items-center justify-start">
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />

        <main className="w-full flex-1 py-4 pe-4">
          <LayoutHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
