import {
  cloneElement,
  FC,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { t } from "i18next";

type Props = {
  activator: ReactNode;
};

export const CreateRequestModal: FC<Props> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleActivatorClick = (e: MouseEvent<HTMLElement>) => {
    if (isValidElement(activator) && activator.props.onClick) {
      activator.props.onClick(e);
    }
    onOpen();
  };

  const activatorWithProps = isValidElement(activator) ? (
    cloneElement(activator, {
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
          hideCloseButton={true}
          isDismissable={false}
          className="w-[1200px]"
          size="2xl"
          onClose={handleModalClose}
        >
          <ModalContent>
            <ModalBody>body</ModalBody>

            <ModalFooter className="mt-4 md:pb-6">
              <Button onPress={handleModalClose}>{t("shared.close")}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
