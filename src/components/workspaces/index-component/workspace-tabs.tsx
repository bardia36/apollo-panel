import { Key } from "react";
import { t } from "i18next";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const WorkspaceTab = ({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (key: Key | null) => void;
}) => {
  const isInfoTab = activeTab === "info";

  return (
    <div className="py-4">
      <Tabs
        selectedKey={activeTab}
        aria-label="Requests Types"
        size="lg"
        className="mb-4"
        onSelectionChange={onChange}
      >
        <Tab
          key="info"
          title={
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  isInfoTab
                    ? "solar:info-circle-bold"
                    : "solar:info-circle-linear"
                }
                width={20}
                height={20}
                className={
                  isInfoTab ? "text-default-foreground" : "text-default-400"
                }
              />

              {t("workspaces.workspaceInfo")}
            </div>
          }
        />
        <Tab
          key="settings"
          title={
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  isInfoTab ? "solar:settings-linear" : "solar:settings-bold"
                }
                width={20}
                height={20}
                className={
                  !isInfoTab ? "text-default-foreground" : "text-default-400"
                }
              />

              {t("workspaces.settings")}
            </div>
          }
        />
      </Tabs>
    </div>
  );
};

export default WorkspaceTab;
