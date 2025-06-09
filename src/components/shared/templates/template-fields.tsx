import { AppInput } from "@/components/shared/app-components/app-input";
import { TemplateField, TemplateType } from "@/types/templates";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { FieldChip } from "@/components/shared/templates/field-chip";

type Props = {
  templateFields: TemplateField[];
  readonly?: boolean;
  generalFieldsTitle?: string;
  documentFieldsTitle?: string;
  customFieldsTitle?: string;
  onFieldsActiveCountChange?: (count: number) => void;
  onFieldsChange?: (fields: TemplateField[]) => void;
};

export const TemplateFields = ({
  templateFields,
  readonly = false,
  generalFieldsTitle = t("shared.images"),
  documentFieldsTitle = t("shared.files"),
  customFieldsTitle = t("shared.addedItems"),
  onFieldsActiveCountChange,
  onFieldsChange,
}: Props) => {
  const [generalFields, setGeneralFields] = useState<TemplateField[]>([]);
  const [documentFields, setDocumentFields] = useState<TemplateField[]>([]);
  const [customFields, setCustomFields] = useState<TemplateField[]>([]);
  const [newFieldTitle, setNewFieldTitle] = useState<string>("");
  const initialized = useRef(false);

  // Initialize fields only once when templateFields prop changes and not initialized yet
  useEffect(() => {
    if (!initialized.current) {
      setGeneralFields(
        templateFields.filter(
          (field) => field.type === "GALLERY" || field.type === "GENERAL"
        ) || []
      );
      setDocumentFields(
        templateFields.filter((field) => field.type === "DOCUMENT") || []
      );
      setCustomFields(
        templateFields.filter((field) => field.type === "CUSTOM") || []
      );
      initialized.current = true;
    }
  }, [templateFields]);

  // Update counts and notify parent when fields change
  const updateParent = (
    newGeneralFields = generalFields,
    newDocumentFields = documentFields,
    newCustomFields = customFields
  ) => {
    const allFields = [
      ...newGeneralFields,
      ...newDocumentFields,
      ...newCustomFields,
    ];
    const activeFields = allFields.filter((field) => field.active);
    if (onFieldsActiveCountChange)
      onFieldsActiveCountChange(activeFields.length);
    if (onFieldsChange) onFieldsChange(allFields);
  };

  function checkChipTitleOverflows(title: string) {
    return title.length > 30;
  }

  function addField() {
    if (!newFieldTitle) return;
    if (customFields.some((field) => field.title === newFieldTitle)) {
      setNewFieldTitle("");
      return;
    }

    const field: TemplateField = {
      _id: `-1`,
      title: newFieldTitle,
      type: "CUSTOM",
      active: true,
    };

    const newCustomFields = [...customFields, field];
    setCustomFields(newCustomFields);
    setNewFieldTitle("");

    // Update parent with new fields
    setTimeout(
      () => updateParent(generalFields, documentFields, newCustomFields),
      0
    );
  }

  function toggleFieldActive(field: TemplateField, fieldType: TemplateType) {
    if (readonly) return;

    const stateSetters = {
      GALLERY: setGeneralFields,
      GENERAL: setGeneralFields,
      DOCUMENT: setDocumentFields,
      CUSTOM: setCustomFields,
    };

    stateSetters[fieldType]((prev: TemplateField[]) => {
      const newFields = prev.map((f) =>
        `${f._id}-${f.title}` === `${field._id}-${field.title}`
          ? { ...f, active: !f.active }
          : f
      );

      // Update parent with the correct set of fields
      setTimeout(() => {
        if (fieldType === "GENERAL" || fieldType === "GALLERY")
          updateParent(newFields, documentFields, customFields);
        else if (fieldType === "DOCUMENT")
          updateParent(generalFields, newFields, customFields);
        else updateParent(generalFields, documentFields, newFields);
      }, 0);

      return newFields;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {!!generalFields.length && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2">
            {generalFieldsTitle}
          </h6>
          <div className="grid grid-cols-2 gap-1">
            {generalFields.map((field) => (
              <FieldChip
                key={`${field._id}-${field.title}`}
                field={field}
                readonly={readonly}
                className={
                  checkChipTitleOverflows(field.title) ? "col-span-2" : ""
                }
                onClick={() => toggleFieldActive(field, "GENERAL")}
              />
            ))}
          </div>
        </div>
      )}

      {!!documentFields.length && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2">
            {documentFieldsTitle}
          </h6>
          <div className="grid grid-cols-2 gap-1">
            {documentFields.map((field) => (
              <FieldChip
                key={`${field._id}-${field.title}`}
                field={field}
                readonly={readonly}
                className={
                  checkChipTitleOverflows(field.title) ? "col-span-2" : ""
                }
                onClick={() => toggleFieldActive(field, "DOCUMENT")}
              />
            ))}
          </div>
        </div>
      )}

      {!!customFields.length && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2">
            {customFieldsTitle}
          </h6>
          <div className="grid grid-cols-2 gap-1">
            {customFields.map((field) => (
              <FieldChip
                key={`${field._id}-${field.title}`}
                field={field}
                readonly={readonly}
                className={
                  checkChipTitleOverflows(field.title) ? "col-span-2" : ""
                }
                onClick={() => toggleFieldActive(field, "CUSTOM")}
              />
            ))}
          </div>
        </div>
      )}

      {!readonly && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2 ">
            {t("shared.addNewItem")}
          </h6>

          <AppInput
            value={newFieldTitle}
            variant="bordered"
            autoFocus
            placeholder={t("expertRequests.wantedItemTitle")}
            classNames={{
              inputWrapper: "pe-1",
            }}
            endContent={
              <AddFieldButton
                disabled={!newFieldTitle?.length}
                onAdd={addField}
              />
            }
            onValueChange={setNewFieldTitle}
            onKeyUp={(e) => {
              if (e.key === "Enter") addField();
            }}
          />
        </div>
      )}
    </div>
  );
};

type AddFieldButtonProps = {
  disabled: boolean;
  onAdd: () => void;
};
const AddFieldButton = ({ disabled, onAdd }: AddFieldButtonProps) => {
  return (
    <Button
      color="primary"
      isDisabled={disabled}
      className="h-8 shadow-lg shadow-primary/40 rounded-lg cursor-pointer"
      onPress={onAdd}
    >
      <div className="flex items-center gap-1">
        <Icon icon="mdi:plus-circle" width={20} height={20} />
        <span className="text-xs">{t("shared.addIt")}</span>
      </div>
    </Button>
  );
};
