import { Template, Templates } from "@/types/templates";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { t } from "i18next";
import { LazyImage } from "@/components/shared/lazy-image";

type Props = {
  templates: Templates;
  activeTemplateId: string;
  isOnAddingTemplate: boolean;
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
          <Button
            key={template._id}
            variant={
              activeTemplateId === template._id && !isOnAddingTemplate
                ? "bordered"
                : "light"
            }
            className={cn(
              "flex items-center px-[18px] h-14 text-default-800 justify-start",
              activeTemplateId === template._id
                ? "border-primary bg-default-50"
                : "bg-default-100"
            )}
            onPress={() => showTemplateDetail(template)}
          >
            <LazyImage
              src={template.logo}
              alt={template.name}
              width={36}
              height={36}
            />

            <span className="text-default-800 font-semibold">
              {template.name}
            </span>
          </Button>
        ))}
      </div>
    </>
  );
};
