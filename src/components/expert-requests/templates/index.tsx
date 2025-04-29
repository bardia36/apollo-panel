import {
  cloneElement,
  FC,
  isValidElement,
  MouseEvent,
  ReactNode,
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
import { templatesApi } from "@/services/api";
import { exceptionHandler } from "@/services/api/exception";
import { Template, Templates } from "@/types/templates";
// components
import { NewTemplateDetails } from "./NewTemplateDetails";
import { AvailableTemplates } from "./AvailableTemplates";
import { Avatar } from "@heroui/avatar";
import { cn } from "@heroui/theme";
import { ExistedTemplateDetails } from "./ExistedTemplateDetails";

type Props = {
  activator: ReactNode;
};

export const TemplatesModal: FC<Props> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [templates, setTemplates] = useState<Templates>();
  const [activeTemplate, setActiveTemplate] = useState<Template>();
  const [isOnAddingTemplate, setIsOnAddingTemplate] = useState<boolean>(false);
  const [activeDetailsComponent, setActiveDetailsComponent] = useState<
    "NEW" | "EXISTED"
  >("EXISTED");

  async function getTemplates() {
    try {
      const templatesRes = await templatesApi.getTemplates();
      templatesRes.docs.push({
        _id: "680f7aadf8479238ec28f3d1",
        active: false,
        name: "پیش‌testفرض‌",
        logo: "/temp/template/car.svg",
        fields: [],
      });
      templatesRes.docs.push({
        _id: "680f7aad22479238ec28f3d1",
        active: false,
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
    setActiveDetailsComponent("EXISTED");
  }

  function addTemplate() {
    console.log("add template");
    setIsOnAddingTemplate(true);
    setActiveDetailsComponent("NEW");
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
          onClose={onClose}
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
              {templates && activeTemplate && (
                <AvailableTemplates
                  templates={templates}
                  isOnAddingTemplate={isOnAddingTemplate}
                  activeTemplateId={activeTemplate._id}
                  showTemplateDetail={showExistedTemplateDetail}
                />
              )}

              <Button
                variant="bordered"
                className={cn(
                  "mt-2 bg-default-50 text-primary border-default-200 h-14 justify-start",
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

                <label className="font-semibold">
                  {t("expertRequests.newTemplate")}
                </label>
              </Button>

              {activeDetailsComponent === "NEW" ? (
                <NewTemplateDetails />
              ) : (
                activeTemplate && (
                  <ExistedTemplateDetails template={activeTemplate} />
                )
              )}
            </ModalBody>

            <ModalFooter>
              <Button onPress={onClose}>{t("shared.saveAndSubmit")}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
