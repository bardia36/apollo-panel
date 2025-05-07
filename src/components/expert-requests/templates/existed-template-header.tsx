import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { Template } from "@/types/templates";
import FieldsCountChip from "./components/fields-count-chip";

type ExistedTemplateDetailsHeaderProps = {
  templateName: Template["name"];
  activeFieldsCount: number;
  onDeleteTemplate: () => void;
};
export const ExistedTemplateHeader = ({
  templateName,
  activeFieldsCount,
  onDeleteTemplate,
}: ExistedTemplateDetailsHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <h6 className="text-xs text-default-600">
        {t("expertRequests.templateDetails")}
      </h6>

      <h5 className="text-default-800 text-sm font-semibold me-auto">
        {templateName}
      </h5>

      <FieldsCountChip activeFieldsCount={activeFieldsCount} />

      <Button
        variant="light"
        color="danger"
        className="px-2 h-8 text-xs"
        onPress={onDeleteTemplate}
      >
        <Icon icon="solar:trash-bin-trash-bold" width={20} height={20} />
        {t("expertRequests.deleteTemplate")}
      </Button>
    </div>
  );
};
