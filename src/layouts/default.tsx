import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layouts/default/sidebar/index";
import LayoutHeader from "@/components/layouts/default/layout-header";

export default function DefaultLayout() {
  return (
    <div className="flex items-center justify-start">
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />

        <main className="w-full max-w-screen-2xl mx-auto p-4 flex-1 overflow-y-auto">
          <LayoutHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
