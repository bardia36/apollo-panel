import { Template } from "@/types/templates";
import { Skeleton } from "@heroui/react";
import { lazy, Suspense } from "react";
import { ExistedTemplateHeader } from "./existed-template-header.tsx";
const NewTemplateHeader = lazy(() => import("./new-template-header.tsx"));

type TemplateDetailsHeaderProps = {
  isOnAddingTemplate: boolean;
  template?: { name: Template["name"]; default: Template["default"] };
  onDeleteTemplate: () => void;
  onNewTemplatePropertyChange?: (
    property: "name" | "logo",
    value: string
  ) => void;
};

export const TemplateDetailsHeader = ({
  isOnAddingTemplate,
  template,
  onDeleteTemplate,
  onNewTemplatePropertyChange,
}: TemplateDetailsHeaderProps) => {
  return (
    <div className="mb-2">
      {isOnAddingTemplate ? (
        <Suspense
          fallback={
            <Skeleton className="rounded-lg">
              <div className="h-12 rounded-lg bg-default-300" />
            </Skeleton>
          }
        >
          <NewTemplateHeader onPropertyChange={onNewTemplatePropertyChange} />
        </Suspense>
      ) : (
        <>
          {!!template && (
            <ExistedTemplateHeader
              template={template}
              onDeleteTemplate={onDeleteTemplate}
            />
          )}
        </>
      )}
    </div>
  );
};
