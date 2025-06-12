import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { Key } from "react";

export default ({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (key: Key | null) => void;
}) => {
  const isArchiveTab = activeTab === "archive";

  return (
    <Tabs
      selectedKey={activeTab}
      aria-label="Requests Types"
      size="lg"
      className="mb-4"
      onSelectionChange={onChange}
    >
      <Tab
        key="current"
        title={
          <div className="flex items-center gap-2">
            <Icon
              icon={
                isArchiveTab
                  ? "solar:folder-open-linear"
                  : "solar:folder-open-bold"
              }
              width={20}
              height={20}
              className={
                isArchiveTab ? "text-default-400" : "text-default-foreground"
              }
            />

            {t("expertRequests.currentCases")}
          </div>
        }
      />
      <Tab
        key="archive"
        title={
          <div className="flex items-center gap-2">
            <Icon
              icon={isArchiveTab ? "solar:folder-bold" : "solar:folder-linear"}
              width={20}
              height={20}
              className={
                !isArchiveTab ? "text-default-400" : "text-default-foreground"
              }
            />

            {t("expertRequests.archive")}
          </div>
        }
      />
    </Tabs>
  );
};
