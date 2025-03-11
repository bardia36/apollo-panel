import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layouts/Sidebar";

export default function DefaultLayout() {
  return (
    <div className="flex items-center justify-start">
      <div className="flex h-screen w-full gap-4 overflow-hidden">
        <Sidebar />

        <main className="w-full max-w-2xl flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
