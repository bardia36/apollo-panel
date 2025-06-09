import { NeutralChip } from "@/components/shared/workspace-status-chip";
import { Workspace } from "@/types/workspace";
import { statusesMap } from "@/components/workspaces/constants";
import { t } from "i18next";
import { JustDateDisplay } from "@/components/shared/date-display";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const IndexHeader = ({
  workspaceData,
}: {
  workspaceData: Workspace | null;
}) => {
  return (
    <div className="flex justify-between mt-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-3xl">{workspaceData?.name}</h1>

          <NeutralChip
            status={{
              uid: workspaceData?.status!,
              label: statusesMap[workspaceData?.status!]?.label,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="text-default-400 text-sm">
            {t("workspaces.active_at")}:{" "}
          </p>

          <JustDateDisplay
            isoDate={workspaceData?.active_at!}
            className="text-default-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly size="sm" className="me-2">
              <Icon
                icon="solar:menu-dots-bold"
                width={20}
                height={20}
                className="text-default-foreground"
              />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            closeOnSelect={false}
            aria-label="Secondary Actions menu"
          >
            <DropdownItem
              key="templates"
              classNames={{
                title: "text-default-foreground flex items-center",
              }}
            ></DropdownItem>

            <DropdownItem
              key="settings"
              classNames={{
                title: "text-default-foreground flex items-center",
              }}
            ></DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button variant="shadow">{t("shared.editInformation")}</Button>

        <Button
          variant="shadow"
          size="lg"
          className="bg-foreground-900 text-foreground-50"
        >
          <Icon icon="mdi:plus-circle" width={20} height={20} />
          {t("workspaces.serviceUpgrade")}
        </Button>
      </div>
    </div>
  );
};

export default IndexHeader;
