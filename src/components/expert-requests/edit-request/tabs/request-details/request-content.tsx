import { t } from "i18next";
import { TemplateFields } from "@/components/shared/templates/template-fields";
import { TemplateField } from "@/types/templates";
import FieldsCountChip from "@/components/shared/templates/fields-count-chip";

export default function RequestContent({
  fields,
}: {
  fields: TemplateField[];
}) {
  const activatedFields = fields.map((field) => ({ ...field, active: true }));

  return (
    <div className="h-full flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <h6 className="text-xs text-default-600">
          {t("expertRequests.requestContent")}
        </h6>

        <FieldsCountChip activeFieldsCount={activatedFields.length} />
      </div>

      <div className="bg-content1 rounded-3xl p-4 flex-1">
        <TemplateFields templateFields={activatedFields} readonly={true} />
      </div>
    </div>
  );
}
