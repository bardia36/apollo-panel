import { cloneElement, FC, isValidElement, MouseEvent, ReactNode } from "react";
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

interface TemplatesProps {
  activator: ReactNode;
}

export const TemplatesModal: FC<TemplatesProps> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Create a wrapper function to handle the click event
  const handleActivatorClick = (e: MouseEvent<HTMLElement>) => {
    // If the activator already has an onClick, call it
    if (isValidElement(activator) && activator.props.onClick)
      activator.props.onClick(e);
    // Then open the modal
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

      <Modal
        isOpen={isOpen}
        backdrop="blur"
        classNames={{ closeButton: "top-[1rem] left-[1.5rem]" }}
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

          <ModalBody>
            <p className="text-default-600 mb-2">{ t('expertRequests.availableTemplates')}</p>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="border border-default-200 rounded-lg p-4 hover:bg-default-100 cursor-pointer">
                Template 1
              </div>
              <div className="border border-default-200 rounded-lg p-4 hover:bg-default-100 cursor-pointer">
                Template 2
              </div>
              <div className="border border-default-200 rounded-lg p-4 hover:bg-default-100 cursor-pointer">
                Template 3
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onPress={onClose}>{t("shared.saveAndSubmit")}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
