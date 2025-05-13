import { useEffect, useState } from "react";
import { TemplateCard } from "../../templates/available-templates";
import { TemplateFields } from "../../templates/components/template-fields";
import { Templates } from "@/types/templates";
import { exceptionHandler } from "@/services/api/exception";
import { templatesApi } from "@/services/api/templates";
import { t } from "i18next";
import FieldsCountChip from "../../templates/components/fields-count-chip";
import { useTemplateFields } from "../../templates/components/useTemplateFields";
import { StepperButtons } from "./stepper-buttons";
import { expertRequestsApi } from "@/services/api/expert-requests";
import { Skeleton } from "@heroui/react";

type StepTwoProps = {
  requestId: string | null;
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepTwo({
  requestId,
  onStepComplete,
  onStepBack,
}: StepTwoProps) {
  const [initializing, setInitializing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Templates>();

  // Use the useTemplateFields hook to manage template fields
  const {
    activeTemplate,
    modifiedTemplateFields,
    activeFieldsCount,
    setActiveTemplate,
    setActiveFieldsCount,
    handleFieldsChange,
  } = useTemplateFields();

  useEffect(() => {
    getTemplates();
  }, []);

  async function getTemplates() {
    setInitializing(true);
    try {
      const templatesRes = await templatesApi.getTemplates();

      // add active property to the each field for the ui usages
      templatesRes.docs.forEach((template) =>
        template.fields.forEach((field) => (field.active = true))
      );

      setTemplates(templatesRes);
      // Set the first template as active if available
      if (templatesRes?.docs.length > 0) {
        setActiveTemplate(templatesRes.docs[0]);
      }
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setInitializing(false);
    }
  }

  function submit() {
    if (!requestId || !activeTemplate) {
      console.error("Request ID or active template is missing");
      return;
    }

    setIsLoading(true);

    const body = {
      template_id: activeTemplate._id,
      fields: (
        modifiedTemplateFields[activeTemplate._id] || activeTemplate.fields
      ).map(
        ({ title, type }) => ({
          title,
          type: type === "OTHER" ? "IMAGE" : type,
        }) // Filter to include only title and type and change other type to image
      ),
    };

    expertRequestsApi
      .updateRequestLink(requestId, body)
      .then(() => onStepComplete())
      .catch((err) => exceptionHandler(err))
      .finally(() => setIsLoading(false));
  }

  if (initializing) return <StepTwoLoading />;

  return (
    <>
      <h6 className="text-xs text-default-600 mb-2">
        {t("expertRequests.templates")}
      </h6>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {templates?.docs.map((template) => (
          <TemplateCard
            key={template._id}
            template={template}
            activeTemplateId={activeTemplate?._id || ""}
            showTemplateDetail={setActiveTemplate}
          />
        ))}
      </div>

      {activeTemplate && (
        <>
          <div className="flex justify-between items-center mb-1.5">
            <h6 className="text-xs text-default-600">
              {t("expertRequests.wantedRequests")}
            </h6>

            <FieldsCountChip activeFieldsCount={activeFieldsCount} />
          </div>

          <div className="p-4 flex flex-col gap-4 bg-default-50 text-default-600 border-dashed shadow-lg rounded-[20px] border-default-200 border-2">
            <TemplateFields
              key={activeTemplate._id}
              templateFields={
                modifiedTemplateFields[activeTemplate._id] ||
                activeTemplate.fields
              }
              onFieldsActiveCountChange={setActiveFieldsCount}
              onFieldsChange={(updatedFields) =>
                handleFieldsChange(activeTemplate._id, updatedFields)
              }
            />
          </div>
        </>
      )}

      <StepperButtons
        currentStep={2}
        isLoading={isLoading}
        onNextStep={submit}
        onPrevStep={onStepBack}
      />
    </>
  );
}

export function StepTwoLoading() {
  return (
    <div>
      <h6 className="text-xs text-default-600 mb-2">
        <Skeleton classNames={{ base: "h-4 w-16 rounded-lg" }} />
      </h6>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-4 bg-default-50 rounded-[20px]">
            <Skeleton classNames={{ base: "h-6 w-3/4 mb-2 rounded-lg" }} />
            <Skeleton classNames={{ base: "h-4 w-1/2 rounded-lg" }} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-1.5">
        <h6 className="text-xs text-default-600">
          <Skeleton classNames={{ base: "h-4 w-20 rounded-lg" }} />
        </h6>
        <Skeleton classNames={{ base: "h-6 w-12 rounded-full" }} />
      </div>

      <div className="p-4 bg-default-50 text-default-600 border-dashed shadow-lg rounded-[20px] border-default-200 border-2">
        <h6 className="text-xs text-default-600">
          <Skeleton classNames={{ base: "h-4 w-20 rounded-lg mb-2" }} />
        </h6>

        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              classNames={{ base: "h-6 w-32 rounded-lg" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
