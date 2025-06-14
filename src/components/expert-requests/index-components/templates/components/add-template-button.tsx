import { Avatar, Button } from "@heroui/react";
import { cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";

type AddTemplateButtonProps = {
  isOnAddingTemplate: boolean;
  className?: string;
  addTemplate: () => void;
};

export const AddTemplateButton = ({
  isOnAddingTemplate,
  className,
  addTemplate,
}: AddTemplateButtonProps) => {
  return (
    <Button
      variant="bordered"
      className={cn(
        "bg-default-50 text-primary border-default-200 min-h-14 justify-start",
        isOnAddingTemplate ? "border-primary" : "border-dashed",
        className
      )}
      onPress={addTemplate}
    >
      <Avatar
        className="bg-primary-100 w-9 h-9"
        fallback={
          <Icon
            icon="solar:widget-add-bold"
            width={24}
            height={24}
            className="text-primary"
          />
        }
      />

      <span className="font-semibold">{t("expertRequests.newTemplate")}</span>
    </Button>
  );
};
