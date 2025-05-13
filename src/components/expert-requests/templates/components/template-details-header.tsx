import { Template } from "@/types/templates";
import { Skeleton } from "@heroui/react";
import { lazy, Suspense } from "react";
import { ExistedTemplateHeader } from "../existed-template-header";
const NewTemplateHeader = lazy(() => import("../new-template-header.tsx"));

type TemplateDetailsHeaderProps = {
  isOnAddingTemplate: boolean;
  templateName?: Template["name"];
  activeFieldsCount: number;
  onDeleteTemplate: () => void;
  onNewTemplatePropertyChange?: (
    property: "name" | "logo",
    value: string
  ) => void;
};

export const TemplateDetailsHeader = ({
  isOnAddingTemplate,
  templateName,
  activeFieldsCount,
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
          <NewTemplateHeader
            activeFieldsCount={activeFieldsCount}
            onPropertyChange={onNewTemplatePropertyChange}
          />
        </Suspense>
      ) : (
        <>
          {!!templateName && (
            <ExistedTemplateHeader
              templateName={templateName}
              activeFieldsCount={activeFieldsCount}
              onDeleteTemplate={onDeleteTemplate}
            />
          )}
        </>
      )}
    </div>
  );
};
