import { lazy } from "react";
import { Workspace } from "@/types/workspace";

//
const StatusAlert = lazy(() => import("./status-alert"));
const WorkspacePlans = lazy(() => import("./workspace-plans"));
const Information = lazy(() => import("./information"));
const UserSpecialist = lazy(() => import("./user-specialist"));

interface Props {
  workspaceData: Workspace;
}

const WorkspaceInfo = ({ workspaceData }: Props) => {
  return (
    <div className="gap-4 grid lg:grid-cols-12">
      <div className="gap-12 grid lg:grid-cols-12 col-span-12 bg-default-50 mb-4 p-4 rounded-large">
        <StatusAlert workspaceData={workspaceData} />

        <WorkspacePlans workspaceData={workspaceData} />
      </div>

      <div className="col-span-8 bg-default-50 p-4 rounded-large">
        <div className="grid grid-cols-12">
          <Information workspaceData={workspaceData} />
        </div>
      </div>

      <div className="col-span-4 bg-default-50 p-4 rounded-large">
        <UserSpecialist workspaceData={workspaceData} />
      </div>
    </div>
  );
};

export default WorkspaceInfo;
