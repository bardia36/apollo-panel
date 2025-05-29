import { useState, useCallback } from "react";
import { Template, TemplateField } from "@/types/templates";

export function useTemplateFields() {
  // State to track modified fields for each template
  const [modifiedTemplateFields, setModifiedTemplateFields] = useState<
    Record<string, TemplateField[]>
  >({});

  // State to track the active template
  const [activeTemplate, setActiveTemplate] = useState<Template | undefined>();

  // State to track active fields count
  const [activeFieldsCount, setActiveFieldsCount] = useState<number>(0);

  // Function to handle field changes
  const handleFieldsChange = useCallback(
    (templateId: string, updatedFields: TemplateField[]) => {
      const currentFields =
        modifiedTemplateFields[templateId] ||
        (templateId !== "new_template" && activeTemplate?._id === templateId
          ? activeTemplate.fields
          : []);

      // Only update if fields have actually changed
      if (JSON.stringify(currentFields) !== JSON.stringify(updatedFields)) {
        setModifiedTemplateFields((prev) => ({
          ...prev,
          [templateId]: updatedFields,
        }));
      }
    },
    [modifiedTemplateFields, activeTemplate]
  );

  // Function to set the active template
  const setActiveTemplateWithFields = useCallback(
    (template: Template | undefined) => {
      setActiveTemplate(template);
      if (template) {
        // Initialize fields for this template if not already present
        setModifiedTemplateFields((prev) => {
          if (!prev[template._id]) {
            return {
              ...prev,
              [template._id]: template.fields,
            };
          }
          return prev;
        });
      }
    },
    []
  );

  // Function to reset all state
  const resetTemplateFields = useCallback(() => {
    setModifiedTemplateFields({});
    setActiveTemplate(undefined);
    setActiveFieldsCount(0);
  }, []);

  // Function to get fields for a specific template
  const getTemplateFields = useCallback(
    (templateId: string) => {
      return (
        modifiedTemplateFields[templateId] ||
        (templateId !== "new_template" && activeTemplate?._id === templateId
          ? activeTemplate.fields
          : [])
      );
    },
    [modifiedTemplateFields, activeTemplate]
  );

  // Function to prepare templates for submission
  const prepareTemplatesForSubmission = useCallback(
    (templates: Template[]) => {
      return templates.map((template) => ({
        _id: template._id,
        name: template.name,
        logo: template.logo,
        fields: (modifiedTemplateFields[template._id] || template.fields || [])
          .filter((field) => field.active) // Filter out inactive fields
          .map((field) => ({
            _id: field._id,
            type: field.type === "OTHER" ? "IMAGE" : field.type,
            title: field.title,
            // active property was frontend usage only
          })),
      }));
    },
    [modifiedTemplateFields]
  );

  return {
    modifiedTemplateFields,
    activeTemplate,
    activeFieldsCount,
    setModifiedTemplateFields,
    setActiveTemplate: setActiveTemplateWithFields,
    setActiveFieldsCount,
    handleFieldsChange,
    getTemplateFields,
    resetTemplateFields,
    prepareTemplatesForSubmission,
  };
}
