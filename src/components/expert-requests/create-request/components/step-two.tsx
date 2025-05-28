import { useEffect, useState } from "react";
import { TemplateCard } from "../../templates/available-templates";
import { TemplateFields } from "../../templates/components/template-fields";
import { Templates, TemplateField } from "@/types/templates";
import { exceptionHandler } from "@/apis/exception";
import { templatesApi } from "@/apis/templates";
import { t } from "i18next";
import FieldsCountChip from "../../templates/components/fields-count-chip";
import { StepperButtons } from "./stepper-buttons";
import { expertRequestsApi } from "@/apis/expert-requests";
import { StepTwoLoading } from "./loadings/step-two-loading";
import { useCreateRequest } from "../context/create-request-context";

type StepTwoProps = {
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepTwo({ onStepComplete, onStepBack }: StepTwoProps) {
  const [initializing, setInitializing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Templates>();
  const [activeFieldsCount, setActiveFieldsCount] = useState(0);
  const {
    requestId,
    requestData,
    setRequestData,
    activeTemplate,
    setActiveTemplate,
    modifiedTemplateFields,
    setModifiedTemplateFields,
  } = useCreateRequest();

  // Only fetch templates once on mount
  useEffect(() => {
    getTemplates();
  }, []);

  // Initialize fields only once when template changes or requestData is loaded
  useEffect(() => {
    if (
      requestData &&
      activeTemplate &&
      !modifiedTemplateFields[activeTemplate._id]
    ) {
      const fieldsWithId = requestData.required_fields.map((field) => ({
        ...field,
        _id:
          activeTemplate.fields.find((f) => f.title === field.title)?._id || "",
        active: true,
      }));

      setModifiedTemplateFields({
        ...modifiedTemplateFields,
        [activeTemplate._id]: fieldsWithId,
      });

      // Initialize active fields count
      setActiveFieldsCount(fieldsWithId.length);
    } else if (activeTemplate && !modifiedTemplateFields[activeTemplate._id]) {
      // Initialize with template's default fields if no requestData
      const initialFields = activeTemplate.fields.map((field) => ({
        ...field,
        active: true,
      }));

      setModifiedTemplateFields({
        ...modifiedTemplateFields,
        [activeTemplate._id]: initialFields,
      });

      // Initialize active fields count
      setActiveFieldsCount(initialFields.length);
    }
  }, [requestData, activeTemplate?._id]); // Only depend on _id to prevent unnecessary updates

  // Update active fields count when template fields change
  useEffect(() => {
    if (activeTemplate && modifiedTemplateFields[activeTemplate._id]) {
      const activeFields = modifiedTemplateFields[activeTemplate._id].filter(
        (field) => field.active
      );
      setActiveFieldsCount(activeFields.length);
    }
  }, [modifiedTemplateFields, activeTemplate]);

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

  const handleFieldsChange = (
    templateId: string,
    updatedFields: TemplateField[]
  ) => {
    setModifiedTemplateFields({
      ...modifiedTemplateFields,
      [templateId]: updatedFields,
    });
  };

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
      )
        .filter((field) => field.active)
        .map(({ title, type }) => ({
          title,
          type: type === "OTHER" ? "IMAGE" : type,
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
