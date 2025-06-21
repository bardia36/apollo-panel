import { t } from "i18next";
import { getTimeDistance } from "@/utils/base";
import type { Workspace } from "@/types/workspace";

// components
import { Chip } from "@heroui/react";
import { NeutralChip } from "@/components/shared/workspace-status-chip";
import { statusesMap } from "@/components/workspaces/constants";

interface Props {
  workspaceData: Workspace;
}

const StatusAlert = ({ workspaceData }: Props) => {
  return (
    <div className="col-span-8">
      <p className="mb-4 font-normal text-default-600 text-xs">
        {t("workspaces.theStateOfTheWorkspace")}
      </p>

      <div className="flex justify-center items-center bg-content1 p-4 rounded-large min-h-[240px]">
        <p className="flex items-center gap-2 font-light text-xl">
          {!!workspaceData.status && !!workspaceData.active_at && (
            <>
              <span className="text-foreground">
                {t("workspaces.thisWorkspaceIsFor")}
              </span>

              <Chip variant="flat" radius="full">
                {getTimeDistance(workspaceData.active_at)}
              </Chip>

              <span>{t("shared.isThat")}</span>

              <span>{t("shared.status")}</span>

              <NeutralChip
                status={{
                  uid: workspaceData.status,
                  label: statusesMap[workspaceData.status]?.label,
                }}
              />

              <span>{t("workspaces.isLocated")}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default StatusAlert;
