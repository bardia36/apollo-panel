import { Key, lazy, useEffect, useState } from "react";
import {
  useWorkspace,
  WorkspaceProvider,
} from "./index-component/context/workspace-context";
import useWorkspaceStore from "@/stores/workspace-store";
import WorkspaceSkeleton from "./index-component/workspace-skeleton";

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

  if (loading) return <WorkspaceSkeleton />;

  return (
    !!workspace && (
      <div className="lg:px-4">
        <IndexHeader workspaceData={workspace} />

        <WorkspaceTabs activeTab={activeTab} onChange={onTabChange} />

        <WorkspaceTabContent activeTab={activeTab} workspaceData={workspace} />
      </div>
    )
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
