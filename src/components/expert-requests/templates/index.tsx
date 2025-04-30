import {
  cloneElement,
  FC,
  isValidElement,
  lazy,
  MouseEvent,
  ReactNode,
  Suspense,
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
import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { templatesApi } from "@/services/api";
import { exceptionHandler } from "@/services/api/exception";
import { Template, Templates } from "@/types/templates";
// components
import { AvailableTemplates } from "./AvailableTemplates.tsx";
import {
  ExistedTemplateDetails,
  ExistedTemplateDetailsHeader,
} from "./ExistedTemplateDetails";
import { NewTemplateDetailsHeader } from "./NewTemplateDetails.tsx";
const NewTemplateDetails = lazy(() => import("./NewTemplateDetails.tsx"));

type Props = {
  activator: ReactNode;
};

export const TemplatesModal: FC<Props> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [templates, setTemplates] = useState<Templates>();
  const [activeTemplate, setActiveTemplate] = useState<Template>();
  const [isOnAddingTemplate, setIsOnAddingTemplate] = useState<boolean>(false);

  async function getTemplates() {
    try {
      const templatesRes = await templatesApi.getTemplates();
      templatesRes.docs.push({
        _id: "680f7aadf8479238ec28f3d1",
        name: "پیش‌testفرض‌",
        logo: "/temp/template/car.svg",
        fields: [],
      });
      templatesRes.docs.push({
        _id: "680f7aad22479238ec28f3d1",
        name: "پیش‌tes22tفرض‌",
        logo: "/temp/template/car.svg",
        fields: [
          {
            type: "IMAGE",
            title:
              "مجموعه تصاویر اطراف خودرو، ۸ تصویر از زوایای مختلف نمای بیرونی خودرو",
            _id: "680f746df8479238ec28f3d2",
          },
        ],
      });
      setTemplates(templatesRes);
      setActiveTemplate(templatesRes?.docs[0]);
    } catch (err) {
      exceptionHandler(err);
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
    console.log(activeTemplate?.name);

    const filteredTemplates = templates?.docs.filter(
      (template) => template._id !== activeTemplate?._id
    );
    setTemplates({
      ...templates,
      docs: filteredTemplates as Template[],
    } as Templates);

    console.log(templates?.docs.length);

    if (templates?.docs.length) {
      console.log("in if");

      setActiveTemplate(filteredTemplates?.[0]);
    } else {
      setActiveTemplate(undefined);
      setIsOnAddingTemplate(true);
    }

    console.log(activeTemplate?.name);
  }

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
          classNames={{ closeButton: "top-[1rem] left-[1.5rem]" }}
          className="w-[615px]"
          size="2xl"
          onClose={onClose} // TODO: Handle onClose (reset)
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

            <ModalBody className="gap-0">
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
                onDeleteTemplate={deleteTemplate}
              />

              <div className="p-4 flex flex-col gap-4 bg-default-50 text-default-600 border-dashed shadow-lg rounded-[20px] border-default-200 border-2">
                {!!isOnAddingTemplate ? (
                  <Suspense
                    fallback={
                      <Skeleton className="rounded-lg">
                        <div className="h-12 rounded-lg bg-default-300" />
                      </Skeleton>
                    }
                  >
                    <NewTemplateDetails />
                  </Suspense>
                ) : (
                  <>
                    {activeTemplate && (
                      <ExistedTemplateDetails
                        templateFields={activeTemplate.fields}
                      />
                    )}
                  </>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="md:pb-6">
              <Button onPress={onClose}>{t("shared.saveAndSubmit")}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

type AddTemplateButtonProps = {
  isOnAddingTemplate: boolean;
  addTemplate: () => void;
};
const AddTemplateButton = ({
  isOnAddingTemplate,
  addTemplate,
}: AddTemplateButtonProps) => {
  return (
    <Button
      variant="bordered"
      className={cn(
        "mt-2 mb-6 bg-default-50 text-primary border-default-200 h-14 justify-start",
        isOnAddingTemplate ? "border-primary" : "border-dashed"
      )}
      onPress={addTemplate}
    >
      <Avatar
        className="bg-primary-100 w-9 h-9"
        fallback={
          <Icon
            icon="solar:widget-add-bold"
            width={24}
            height={24}
            className="text-primary"
          />
        }
      />

      <span className="font-semibold">{t("expertRequests.newTemplate")}</span>
    </Button>
  );
};

type TemplateDetailsHeaderProps = {
  isOnAddingTemplate: boolean;
  templateName?: Template["name"];
  onDeleteTemplate: () => void;
};
const TemplateDetailsHeader = ({
  isOnAddingTemplate,
  templateName,
  onDeleteTemplate,
}: TemplateDetailsHeaderProps) => {
  return (
    <div className="mb-2">
      {isOnAddingTemplate ? (
        <NewTemplateDetailsHeader />
      ) : (
        <>
          {!!templateName && (
            <ExistedTemplateDetailsHeader
              templateName={templateName}
              onDeleteTemplate={onDeleteTemplate}
            />
          )}
        </>
      )}
    </div>
  );
};
