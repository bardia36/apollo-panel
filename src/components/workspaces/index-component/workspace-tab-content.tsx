import { lazy, Suspense } from "react";
import type { Workspace } from "@/types/workspace";

// components
import Loading from "@/components/shared/loading";

const WorkspaceInfo = lazy(() => import("./tabs/workspace-info"));
const WorkspaceSettings = lazy(() => import("./tabs/workspace-settings"));

interface WorkspaceTabContentProps {
  activeTab: string;
  workspaceData: Workspace;
}

const WorkspaceTabContent = ({
  activeTab,
  workspaceData,
}: WorkspaceTabContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <WorkspaceInfo workspaceData={workspaceData} />;
      case "settings":
        return <WorkspaceSettings />;
      default:
        return null;
    }
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="mt-4">{renderContent()}</div>
    </Suspense>
  );
};

export default WorkspaceTabContent;
