import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { workspaceApi } from "@/apis/workspace";
import { Sidebar } from "@/components/layouts/default/sidebar/index";
import LayoutHeader from "@/components/layouts/default/layout-header";
import useWorkspaceStore from "@/stores/workspace-store";

export default function DefaultLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const { workspace } = useParams();
  const { setWorkspace } = useWorkspaceStore();

  useEffect(() => {
    getWorkspace();
  }, [workspace]);

  async function getWorkspace() {
    try {
      setIsLoading(true);
      const res = await workspaceApi.getWorkspaceBySlug(workspace as string);
      setWorkspace(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-start items-center">
          <div className="flex w-full h-screen overflow-hidden">
            <Sidebar />

            <main
              className="flex-1 mx-auto p-4 w-full max-w-screen-2xl overflow-y-auto"
              role="main"
            >
              <LayoutHeader />
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
