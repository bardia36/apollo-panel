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

type StepTwoProps = {
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepTwo({ onStepComplete, onStepBack }: StepTwoProps) {
  const [initializing, setInitializing] = useState<boolean>(false);
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
    console.log("step 2 submit");
    onStepComplete();
  }

  return (
    <>
      {initializing ? (
        // TODO: add skeleton
        <div>loading</div>
      ) : (
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
            onNextStep={submit}
            onPrevStep={onStepBack}
          />
        </>
      )}
    </>
  );
}
