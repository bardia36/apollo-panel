import {
  cloneElement,
  FC,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { templatesApi } from "@/services/api/templates.ts";
import { exceptionHandler } from "@/services/api/exception";
import { Template, TemplateField, Templates } from "@/types/templates";
// components
import { AvailableTemplates } from "./available-templates.tsx";
import { TemplateFields } from "./components/template-fields.tsx";
import { TemplatesLoadingSkeleton } from "./components/loading-component.tsx";
import { AddTemplateButton } from "./components/add-template-button.tsx";
import { TemplateDetailsHeader } from "./components/template-details-header.tsx";

type Props = {
  activator: ReactNode;
};

export const TemplatesModal: FC<Props> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initializing, setInitializing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<Templates>();
  const [activeTemplate, setActiveTemplate] = useState<Template>();
  const [isOnAddingTemplate, setIsOnAddingTemplate] = useState<boolean>(false);
  const [activeFieldsCount, setActiveFieldsCount] = useState<number>(0);
  // This state tracks modified fields for each template
  const [modifiedTemplateFields, setModifiedTemplateFields] = useState<
    Record<string, TemplateField[]>
  >({});
  // Reference to the new template header component to access its name and logo
  const newTemplateRef = useRef<{ name: string; logo: string }>({
    name: "",
    logo: "",
  });

  async function getTemplates() {
    setInitializing(true);
    try {
      const templatesRes = await templatesApi.getTemplates();

      // add active property to the each field for the ui usages
      templatesRes.docs.forEach((template) =>
        template.fields.forEach((field) => (field.active = true))
      );

      setTemplates(templatesRes);
      setActiveTemplate(templatesRes?.docs[0]);
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setInitializing(false);
    }
  }

  function showExistedTemplateDetail(template: Template) {
    setIsOnAddingTemplate(false);
    setActiveTemplate(template);
  }

  function addTemplate() {
    setIsOnAddingTemplate(true);
  }

  function deleteTemplate() {
    const filteredTemplates = templates?.docs.filter(
      (template) => template._id !== activeTemplate?._id
    );
    setTemplates({
      ...templates,
      docs: filteredTemplates as Template[],
    } as Templates);

    if (templates?.docs.length) setActiveTemplate(filteredTemplates?.[0]);
    else {
      setActiveTemplate(undefined);
      setIsOnAddingTemplate(true);
    }
  }

  // Reusable function to handle field changes
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

  // Replace the separate handler functions with a single function that updates the appropriate property
  const handleNewTemplateProperty = (
    property: "name" | "logo",
    value: string
  ) => {
    newTemplateRef.current[property] = value;
  };

  async function onSubmit() {
    setLoading(true);
    try {
      if (!templates) return;

      const updatedDocs = [...templates.docs];
      // Update existing templates with modified fields
      updatedDocs.forEach((template, index) => {
        if (modifiedTemplateFields[template._id]) {
          updatedDocs[index] = {
            ...template,
            fields: modifiedTemplateFields[template._id],
          };
        }
      });

      // Handle new template if name exists
      if (!!newTemplateRef.current.name?.length) {
        const newTemplate: Template = {
          _id: `-1`,
          name: newTemplateRef.current.name,
          logo: newTemplateRef.current.logo,
          fields: modifiedTemplateFields["new_template"] || [],
        };

        updatedDocs.push(newTemplate);
      }

      const finalTemplates: Template[] = updatedDocs.map((template) => ({
        _id: template._id,
        name: template.name,
        logo: template.logo,
        fields: (template.fields || [])
          .filter((field) => field.active) // Filter out inactive fields
          .map((field) => ({
            _id: field._id,
            type: field.type === "OTHER" ? "IMAGE" : field.type,
            title: field.title,
            // active property was frontend usage only
          })),
      }));

      await templatesApi.updateTemplates(finalTemplates);
      handleModalClose();
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setLoading(false);
    }
  }

  const handleModalClose = useCallback(() => {
    // First close the modal
    onClose();

    // Then reset all states
    setTimeout(() => {
      setTemplates(undefined);
      setActiveTemplate(undefined);
      setIsOnAddingTemplate(false);
      setActiveFieldsCount(0);
      setModifiedTemplateFields({});
      newTemplateRef.current = { name: "", logo: "" };
    }, 300); // Small delay to ensure modal animation completes
  }, [onClose]);

  // Create a wrapper function to handle the click event
  const handleActivatorClick = (e: MouseEvent<HTMLElement>) => {
    // If the activator already has an onClick, call it
    if (isValidElement(activator) && activator.props.onClick)
      activator.props.onClick(e);
    getTemplates();
    onOpen();
  };

  // Clone the activator element with proper typing
  const activatorWithProps = isValidElement(activator) ? (
    cloneElement(activator, {
      // Use the proper event handler name based on the element type
      ...(typeof activator.type === "string" &&
      activator.type.toLowerCase() === "button"
        ? { onPress: handleActivatorClick }
        : { onClick: handleActivatorClick }),
    })
  ) : (
    <span onClick={onOpen}>{activator}</span>
  );

  return (
    <>
      {activatorWithProps}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          backdrop="blur"
          isDismissable={false}
          classNames={{
            closeButton: "top-[1rem] left-[1.5rem]",
            backdrop: "z-[100000]",
            wrapper: "z-[100001]",
          }}
          className="w-[615px] max-h-[90vh] my-auto"
          size="2xl"
          onClose={handleModalClose}
        >
          <ModalContent>
            <ModalHeader className="flex items-center text-default-foreground">
              <Icon
                icon="solar:widget-bold"
                width={24}
                height={24}
                className="me-2"
              />

              {t("expertRequests.templates")}
            </ModalHeader>

            <ModalBody className="gap-0 overflow-y-auto pb-6">
              {initializing ? (
                <TemplatesLoadingSkeleton />
              ) : (
                <>
                  {!!templates?.docs.length && activeTemplate && (
                    <AvailableTemplates
                      templates={templates}
                      isOnAddingTemplate={isOnAddingTemplate}
                      activeTemplateId={activeTemplate._id}
                      showTemplateDetail={showExistedTemplateDetail}
                    />
                  )}

                  <AddTemplateButton
                    isOnAddingTemplate={isOnAddingTemplate}
                    addTemplate={addTemplate}
                  />

                  <TemplateDetailsHeader
                    isOnAddingTemplate={isOnAddingTemplate}
                    templateName={activeTemplate?.name}
                    activeFieldsCount={activeFieldsCount}
                    onDeleteTemplate={deleteTemplate}
                    onNewTemplatePropertyChange={handleNewTemplateProperty}
                  />

                  <div className="p-4 flex flex-col gap-4 bg-default-50 text-default-600 border-dashed shadow-lg rounded-[20px] border-default-200 border-2">
                    {isOnAddingTemplate ? (
                      <TemplateFields
                        key="new_template"
                        templateFields={
                          modifiedTemplateFields["new_template"] || []
                        }
                        onFieldsActiveCountChange={setActiveFieldsCount}
                        onFieldsChange={(updatedFields) =>
                          handleFieldsChange("new_template", updatedFields)
                        }
                      />
                    ) : (
                      <>
                        {activeTemplate && (
                          <TemplateFields
                            key={activeTemplate._id}
                            templateFields={
                              modifiedTemplateFields[activeTemplate._id] ||
                              activeTemplate.fields
                            }
                            onFieldsActiveCountChange={setActiveFieldsCount}
                            onFieldsChange={(updatedFields) =>
                              handleFieldsChange(
                                activeTemplate._id,
                                updatedFields
                              )
                            }
                          />
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </ModalBody>

            <ModalFooter className="md:pb-6">
              <Button
                isDisabled={initializing}
                isLoading={loading}
                onPress={onSubmit}
              >
                {t("shared.saveAndSubmit")}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
