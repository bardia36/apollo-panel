import { Key, lazy, Suspense, useEffect, useState } from "react";
import {
  useWorkspace,
  WorkspaceProvider,
} from "./index-component/context/workspace-context";
import Loading from "@/components/shared/loading";
import useWorkspaceStore from "@/stores/workspace-store";

const IndexHeader = lazy(() => import("./index-component/index-header"));
const WorkspaceTabs = lazy(() => import("./index-component/workspace-tabs"));
const WorkspaceTabContent = lazy(
  () => import("./index-component/workspace-tab-content")
);

function WorkspacesContent() {
  const { workspace: workspaceStore } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState("info");
  const { workspace, loading, refreshWorkspace } = useWorkspace();

  useEffect(() => {
    if (workspaceStore?._id) refreshWorkspace(workspaceStore._id);
  }, [workspaceStore?._id]);

  function onTabChange(key: Key | null) {
    if (key === null) setActiveTab("info");
    else setActiveTab(key as string);
  }

  return (
    <div className="lg:px-4">
      <Suspense fallback={<Loading />}>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <IndexHeader workspaceData={workspace} />

            <WorkspaceTabs activeTab={activeTab} onChange={onTabChange} />

            <WorkspaceTabContent activeTab={activeTab} />
          </div>
        )}
      </Suspense>
    </div>
  );
}

const Workspaces = () => {
  return (
    <WorkspaceProvider>
      <WorkspacesContent />
    </WorkspaceProvider>
  );
};

export default Workspaces;
