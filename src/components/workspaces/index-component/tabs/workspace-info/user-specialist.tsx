import { t } from "i18next";
import type { Workspace } from "@/types/workspace";

// components
import { Avatar } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  workspaceData: Workspace;
}

const UserSpecialist = ({ workspaceData }: Props) => {
  return (
    <div>
      <p className="mb-4 font-normal text-default-600 text-xs">
        {t("workspaces.creator")}
      </p>

      <div className="bg-content1 shadow-sm mb-4 p-4 rounded-large">
        <div className="flex items-center gap-2">
          <Avatar
            size="lg"
            radius="full"
            className="bg-foreground-200 text-primary-foreground"
            classNames={{ icon: "drop-shadow-lg" }}
          />

          <div className="flex-1">
            <h6 className="font-semibold">
              {workspaceData?.creator?.username}
            </h6>

            <div className="flex items-center gap-6">
              <p className="flex items-center gap-2 text-content2-foreground text-xs">
                <Icon icon="solar:user-id-outline" width={16} height={16} />

                <span>{workspaceData?.creator?.role?.name}</span>
              </p>

              {workspaceData?.creator?.unit.code && (
                <p className="flex items-center gap-1 text-content2-foreground text-xs">
                  {t("shared.unitCode")}

                  <span>{workspaceData?.creator?.unit?.code}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 font-normal text-default-600 text-xs">
        {t("workspaces.responsibleUnit")}
      </p>

      <div className="bg-content1 shadow-sm mb-4 p-4 rounded-large">
        <div className="flex items-center gap-2">
          <Avatar
            size="lg"
            radius="full"
            className="bg-foreground-200 text-primary-foreground"
            classNames={{ icon: "drop-shadow-lg" }}
          />

          <div className="flex-1">
            {workspaceData?.owner && (
              <h6 className="font-semibold">
                {workspaceData?.owner?.username}
              </h6>
            )}

            <div className="flex items-center gap-6">
              {workspaceData?.owner?.role?.name && (
                <p className="flex items-center gap-2 text-content2-foreground text-xs">
                  <Icon icon="solar:user-id-outline" width={16} height={16} />

                  <span>{workspaceData?.owner?.role?.name}</span>
                </p>
              )}

              {workspaceData?.owner?.unit?.code && (
                <p className="flex items-center gap-1 text-content2-foreground text-xs">
                  {t("shared.unitCode")}

                  <span>{workspaceData?.owner?.unit?.code}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSpecialist;
