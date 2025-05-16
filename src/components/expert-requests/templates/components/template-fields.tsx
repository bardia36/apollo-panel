import { AppInput } from "@/components/shared/app-components/app-input";
import { TemplateField } from "@/types/templates";
import { Button } from "@heroui/react";
import { Chip } from "@heroui/react";
import { cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";

type Props = {
  templateFields: TemplateField[];
  onFieldsActiveCountChange: (count: number) => void;
  onFieldsChange: (fields: TemplateField[]) => void;
};

export const TemplateFields = ({
  templateFields,
  onFieldsActiveCountChange,
  onFieldsChange,
}: Props) => {
  const [imageFields, setImageFields] = useState<TemplateField[]>(
    templateFields.filter((field) => field.type === "IMAGE") || []
  );
  const [fileFields, setFileFields] = useState<TemplateField[]>(
    templateFields.filter((field) => field.type === "FILE") || []
  );
  const [addedFields, setAddedFields] = useState<TemplateField[]>(
    templateFields.filter((field) => field.type === "OTHER") || []
  );
  const [newFieldTitle, setNewFieldTitle] = useState<string>("");

  // Separate useEffect for counting active fields
  useEffect(() => {
    const allFields = [...imageFields, ...fileFields, ...addedFields];
    const activeFields = allFields.filter((field) => field.active);
    onFieldsActiveCountChange(activeFields.length);
  }, [imageFields, fileFields, addedFields, onFieldsActiveCountChange]);

  // Separate useEffect for notifying parent of changes, with a ref to prevent initial call
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const allFields = [...imageFields, ...fileFields, ...addedFields];
    onFieldsChange(allFields);
  }, [imageFields, fileFields, addedFields, onFieldsChange]);

  function checkChipTitleOverflows(title: string) {
    return title.length > 30;
  }

  function addField() {
    if (!newFieldTitle) return;
    if (addedFields.some((field) => field.title === newFieldTitle)) {
      setNewFieldTitle("");
      return;
    }

    const field: TemplateField = {
      _id: `-1`,
      title: newFieldTitle,
      type: "OTHER",
      active: true,
    };
    setAddedFields((prev) => [...prev, field]);
    setNewFieldTitle("");
  }

  function toggleFieldActive(
    field: TemplateField,
    fieldType: "image" | "file" | "added"
  ) {
    const stateSetters = {
      image: setImageFields,
      file: setFileFields,
      added: setAddedFields,
    };

    stateSetters[fieldType]((prev) =>
      prev.map((f) =>
        `${f._id}-${f.title}` === `${field._id}-${field.title}`
          ? { ...f, active: !f.active }
          : f
      )
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!!imageFields.length && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2">
            {t("shared.images")}
          </h6>
          <div className="grid grid-cols-2 gap-1">
            {imageFields.map((field) => (
              <FieldChip
                key={`${field._id}-${field.title}`}
                field={field}
                className={
                  checkChipTitleOverflows(field.title) ? "col-span-2" : ""
                }
                onClick={() => toggleFieldActive(field, "image")}
              />
            ))}
          </div>
        </div>
      )}

      {!!fileFields.length && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2">
            {t("shared.files")}
          </h6>
          <div className="grid grid-cols-2 gap-1">
            {fileFields.map((field) => (
              <FieldChip
                key={`${field._id}-${field.title}`}
                field={field}
                className={
                  checkChipTitleOverflows(field.title) ? "col-span-2" : ""
                }
                onClick={() => toggleFieldActive(field, "file")}
              />
            ))}
          </div>
        </div>
      )}

      {!!addedFields.length && (
        <div>
          <h6 className="text-xs text-default-600 mb-2 ps-2">
            {t("shared.addedItems")}
          </h6>
          <div className="grid grid-cols-2 gap-1">
            {addedFields.map((field) => (
              <FieldChip
                key={`${field._id}-${field.title}`}
                field={field}
                className={
                  checkChipTitleOverflows(field.title) ? "col-span-2" : ""
                }
                onClick={() => toggleFieldActive(field, "added")}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h6 className="text-xs text-default-600 mb-2 ps-2 ">
          {t("shared.addNewItem")}
        </h6>

        <AppInput
          value={newFieldTitle}
          variant="bordered"
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
    </div>
  );
};

type FieldChipProps = {
  field: TemplateField;
  className?: string;
  onClick?: () => void;
};
export const FieldChip = ({ field, className, onClick }: FieldChipProps) => {
  return (
    <Button
      variant="light"
      className={cn("p-0 w-fit h-fit min-w-fit", className)}
      onPress={onClick}
    >
      <Chip
        isDisabled={!field.active}
        classNames={{
          base: "text-default-foreground bg-default bg-opacity-40 min-h-7 h-auto",
          content: "flex items-center py-1",
        }}
      >
        <Icon
          icon={field.active ? "bi:check" : "clarity:minus-line"}
          width={20}
          height={20}
          className="min-w-5 min-h-5"
        />
        <span className="text-xs ms-1 text-wrap">{field.title}</span>
      </Chip>
    </Button>
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
