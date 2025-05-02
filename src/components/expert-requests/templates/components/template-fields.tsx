import { TemplateField } from "@/types/templates";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

type Props = {
  templateFields: TemplateField[];
  onFieldsActiveCountChange: (count: number) => void;
};

export const TemplateFields = ({
  templateFields,
  onFieldsActiveCountChange,
}: Props) => {
  templateFields.forEach((field) => (field.active = true));
  const [imageFields, setImageFields] = useState<TemplateField[]>(
    templateFields.filter((field) => field.type === "IMAGE")
  );
  const [fileFields, setFileFields] = useState<TemplateField[]>(
    templateFields.filter((field) => field.type === "FILE")
  );
  const [addedFields, setAddedFields] = useState<TemplateField[]>([]);
  const [newFieldTitle, setNewFieldTitle] = useState<string>("");

  useEffect(() => {
    const allFields = [...imageFields, ...fileFields, ...addedFields];
    const activeFields = allFields.filter((field) => field.active);
    onFieldsActiveCountChange(activeFields.length);
  }, [imageFields, fileFields, addedFields, onFieldsActiveCountChange]);

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
      _id: `-${v4()}`,
      title: newFieldTitle,
      type: "IMAGE",
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
      prev.map((f) => (f._id === field._id ? { ...f, active: !f.active } : f))
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
                key={field._id}
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
                key={field._id}
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
                key={field._id}
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
        <Input
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
  onClick: () => void;
};
const FieldChip = ({ field, className, onClick }: FieldChipProps) => {
  return (
    <Button
      variant="light"
      className={cn("p-0 w-fit h-fit min-w-fit", className)}
      onPress={onClick}
    >
      <Chip
        isDisabled={!field.active}
        classNames={{
          base: "text-default-foreground bg-default bg-opacity-40",
          content: "flex items-center",
        }}
      >
        <Icon
          icon={field.active ? "bi:check" : "clarity:minus-line"}
          width={20}
          height={20}
        />
        <span className="text-xs ms-1">{field.title}</span>
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
