import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";

export default ({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (tab: string) => void;
}) => {
  const isArchiveTab = activeTab === "archive";

  return (
    <div className="py-4">
      <Button
        variant={isArchiveTab ? "light" : "solid"}
        radius="full"
        className={
          isArchiveTab ? "text-default-500" : "text-default-foreground"
        }
        onPress={() => onChange("current")}
      >
        <Icon
          icon="solar:folder-open-linear"
          width={20}
          height={20}
          className={isArchiveTab ? "text-default-400" : "text-default-600"}
        />

        {t("expertRequests.currentCases")}
      </Button>

      <Button
        variant={!isArchiveTab ? "light" : "solid"}
        radius="full"
        className={
          !isArchiveTab ? "text-default-500" : "text-default-foreground"
        }
        onPress={() => onChange("archive")}
      >
        <Icon
          icon="solar:folder-linear"
          width={20}
          height={20}
          className={!isArchiveTab ? "text-default-400" : "text-default-600"}
        />

        {t("expertRequests.archive")}
      </Button>
    </div>
  );
};
