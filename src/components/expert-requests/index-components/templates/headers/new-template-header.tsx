import { t } from "i18next";
import { ChangeEvent, useEffect, useState } from "react";
import FieldsCountChip from "@/components/shared/templates/fields-count-chip";
import { ImageUploader } from "@/components/shared/uploader";
import { AppInput } from "@/components/shared/app-components/app-input";
import { useTemplateFields } from "@/hooks/use-template-fields";

type Props = {
  onPropertyChange?: (property: "name" | "logo", value: string) => void;
};

export default ({ onPropertyChange }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { activeFieldsCount } = useTemplateFields();
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onPropertyChange) onPropertyChange("name", e.target.value);
  };

  useEffect(() => {
    if (imageUrl && onPropertyChange) onPropertyChange("logo", imageUrl);
  }, [imageUrl, onPropertyChange]);

  const handleImageChange = (url: string | null) => {
    setImageUrl(url);
  };

  return (
    <div className="flex items-center gap-4 mb-2 px-2 md:px-4">
      <ImageUploader value={imageUrl} onChange={handleImageChange} />

      <AppInput
        label={t("expertRequests.templateName")}
        onChange={handleNameChange}
      />

      <FieldsCountChip activeFieldsCount={activeFieldsCount} />
    </div>
  );
};
