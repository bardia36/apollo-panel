import { useEffect, useState } from "react";
import { TemplateCard } from "@/components/expert-requests/index-components/templates/available-templates";
import { Templates } from "@/types/templates";
import { exceptionHandler } from "@/apis/exception";
import { templatesApi } from "@/apis/templates";
import { t } from "i18next";
import { TemplateFields } from "@/components/shared/templates/template-fields";
import FieldsCountChip from "@/components/shared/templates/fields-count-chip";
import { StepperButtons } from "./stepper-buttons";
import { expertRequestsApi } from "@/apis/expert-requests";
import { StepTwoLoading } from "./loadings/step-two-loading";
import { useCreateRequest } from "../context/create-request-context";
import { useTemplateFields } from "@/hooks/use-template-fields";

type StepTwoProps = {
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepTwo({ onStepComplete, onStepBack }: StepTwoProps) {
  const [initializing, setInitializing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Templates>();
  const { requestId, requestData, setRequestData } = useCreateRequest();

  const {
    activeTemplate,
    setActiveTemplate,
    modifiedTemplateFields,
    activeFieldsCount,
    setActiveFieldsCount,
    handleFieldsChange,
    prepareTemplatesForSubmission,
    getTemplateFields,
  } = useTemplateFields();

  // Only fetch templates once on mount
  useEffect(() => {
    getTemplates();
  }, []);

  // Initialize fields when requestData is loaded
  useEffect(() => {
    if (
      requestData &&
      activeTemplate &&
      !modifiedTemplateFields[activeTemplate._id]
    ) {
      const fieldsWithId = requestData.gallery.map((field) => ({
        ...field,
        _id:
          activeTemplate.fields.find((f) => f.title === field.title)?._id || "",
        active: true,
      }));

      handleFieldsChange(activeTemplate._id, fieldsWithId);
      setActiveFieldsCount(fieldsWithId.length);
    }
  }, [requestData, activeTemplate?._id]);

  async function getTemplates() {
    setInitializing(true);
    try {
      const templatesRes = await templatesApi.getTemplates();

      // add active property to the each field for the ui usages
      templatesRes.docs.forEach((template) =>
        template.fields.forEach((field) => (field.active = true))
      );

      setTemplates(templatesRes);

      // Set the first template as active if no active template exists
      if (!activeTemplate && templatesRes?.docs.length > 0) {
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

    const preparedTemplate = prepareTemplatesForSubmission([activeTemplate])[0];

    const body = {
      template_id: activeTemplate._id,
      fields: preparedTemplate.fields.map(({ title, type }) => ({
        title,
        type,
      })),
    };

    expertRequestsApi
      .registerRequest(requestId, { ...body, step: "LINK" })
      .then((response) => {
        setRequestData(response);
        onStepComplete();
      })
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
              templateFields={getTemplateFields(activeTemplate._id)}
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
