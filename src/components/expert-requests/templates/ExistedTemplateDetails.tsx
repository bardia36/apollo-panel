import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { Template } from "@/types/templates";
import DetailFieldsCountChip from "./components/detail-fields-count-chip";

type ExistedTemplateDetailsHeaderProps = {
  templateName: Template["name"];
  onDeleteTemplate: () => void;
};
export const ExistedTemplateDetailsHeader = ({
  templateName,
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

      <DetailFieldsCountChip selectedFieldsCount={0} />

      <Button
        variant="light"
        color="danger"
        className="px-2 h-8"
        onPress={onDeleteTemplate}
      >
        <Icon icon="solar:trash-bin-trash-bold" width={20} height={20} />
        {t("expertRequests.deleteTemplate")}
      </Button>
    </div>
  );
};

type ExistedTemplateDetailsProps = {
  templateFields: Template["fields"];
};
export const ExistedTemplateDetails = ({
  templateFields,
}: ExistedTemplateDetailsProps) => {
  return <div>{templateFields.length}</div>;
};
