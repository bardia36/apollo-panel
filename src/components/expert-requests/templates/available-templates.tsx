import { Template, Templates } from "@/types/templates";
import { Avatar, Button } from "@heroui/react";
import { cn } from "@heroui/react";
import { t } from "i18next";
import { LazyImage } from "@/components/shared/lazy-image";

type Props = {
  templates: Templates;
  activeTemplateId: string;
  isOnAddingTemplate?: boolean;
  showTemplateDetail: (template: Template) => void;
};

export const AvailableTemplates = ({
  templates,
  activeTemplateId,
  isOnAddingTemplate,
  showTemplateDetail,
}: Props) => {
  return (
    <>
      <h6 className="text-default-600 mb-2 text-xs">
        {t("expertRequests.availableTemplates")}
      </h6>

      <div className="grid grid-cols-2 gap-2 md:gap-x-4">
        {templates?.docs.map((template) => (
          <TemplateCard
            key={template._id}
            template={template}
            activeTemplateId={activeTemplateId}
            isOnAddingTemplate={isOnAddingTemplate}
            showTemplateDetail={showTemplateDetail}
          />
        ))}
      </div>
    </>
  );
};

export const TemplateCard = ({
  template,
  activeTemplateId,
  isOnAddingTemplate,
  showTemplateDetail,
}: {
  template: Template;
  activeTemplateId: string;
  isOnAddingTemplate?: boolean;
  showTemplateDetail: (template: Template) => void;
}) => {
  const isActive = activeTemplateId === template._id;

  return (
    <Button
      key={template._id}
      variant={isActive && isOnAddingTemplate !== true ? "bordered" : "light"}
      className={cn(
        "flex items-center px-[18px] h-14 text-default-800 justify-start",
        isActive ? "border-primary bg-default-50" : "bg-default-100"
      )}
      onPress={() => showTemplateDetail(template)}
    >
      <Avatar
        className="w-9 h-9"
        showFallback
        fallback={
          <LazyImage
            src={template.logo}
            alt={template.name}
            width={24}
            height={24}
            className="min-w-[24px] min-h-[24px]"
          />
        }
      />

      <span className="text-default-800 font-semibold">{template.name}</span>
    </Button>
  );
};
